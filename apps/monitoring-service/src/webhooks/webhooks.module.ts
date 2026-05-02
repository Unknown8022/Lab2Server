import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { Webhook } from '../prosthesis/entities/webhook.entity'; // Перевір шлях до ентиті

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body('targetUrl') targetUrl: string,
    @Body('eventType') eventType: string,
  ): Promise<Webhook> {
    return this.webhooksService.create(targetUrl, eventType);
  }

  @Get()
  async findAll(): Promise<Webhook[]> {
    return this.webhooksService.findAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.webhooksService.remove(id);
  }
}
