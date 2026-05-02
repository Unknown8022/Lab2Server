import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MonitoringServiceService } from '../monitoring-service.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly monitoringService: MonitoringServiceService) {}

  @Post()
  async create(@Body() createWebhookDto: any) {
    // Лог для перевірки в терміналі
    console.log('🚀 Webhook creation request:', createWebhookDto);

    // Повертаємо результат, щоб Postman не висів
    return {
      message: 'Webhook configuration received',
      data: createWebhookDto,
    };
  }
}
