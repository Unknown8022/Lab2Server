import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('gateway')
export class AppController {
  constructor(
    @Inject('MONITORING_RMQ') private readonly monitoringClient: ClientProxy,
  ) {}

  @Post('collect')
  async collectData(@Body() payload: any) {
    // Відправляємо дані в чергу.
    // Назва події 'new_sensor_data' має збігатися з @EventPattern у мікросервісі
    this.monitoringClient.emit('new_sensor_data', payload);
    return { status: 'Sent to RabbitMQ', timestamp: new Date().toISOString() };
  }
}
