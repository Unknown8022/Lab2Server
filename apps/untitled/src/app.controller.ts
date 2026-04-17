import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AdminGateway } from './admin.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // Наш клієнт для RabbitMQ
    @Inject('MONITORING_RMQ') private readonly monitoringClient: ClientProxy,
    // Наш шлюз для WebSockets
    private readonly adminGateway: AdminGateway,
  ) {}

  // Роут для збору даних, який працює і з чергою, і з дашбордом
  @Post('collect')
  async collectData(@Body() payload: any) {
    // 1. Відправляємо в чергу RabbitMQ
    this.monitoringClient.emit('new_sensor_data', payload);

    // 2. Відправляємо в сокети для живого дашборду
    this.adminGateway.sendNewObjectUpdate({
      data: payload,
      timestamp: new Date().toISOString(),
    });

    return { status: 'Broadcasted to Admin and Queue' };
  }
}
