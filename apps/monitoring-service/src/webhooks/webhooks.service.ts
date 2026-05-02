import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Webhook } from '../prosthesis/entities/webhook.entity'; // Шлях до твоєї сутності
import axios from 'axios';

@Injectable()
export class WebhooksService {
  constructor(
    @InjectRepository(Webhook)
    private readonly webhookRepo: Repository<Webhook>,
  ) {}

  // Метод для створення нового хука в базі
  async create(targetUrl: string, eventType: string) {
    const newHook = this.webhookRepo.create({ targetUrl, eventType });
    return this.webhookRepo.save(newHook);
  }

  async findAll(): Promise<Webhook[]> {
    return this.webhookRepo.find();
  }

  async remove(id: number): Promise<void> {
    await this.webhookRepo.delete(id);
  }

  // Метод, який буде розсилати повідомлення
  async trigger(eventType: string, data: any) {
    const hooks = await this.webhookRepo.find({ where: { eventType } });

    hooks.forEach((hook) => {
      axios
        .post(hook.targetUrl, {
          event: eventType,
          data: data,
          sentAt: new Date().toISOString(),
        })
        .catch((err) =>
          console.error(`Webhook error to ${hook.targetUrl}:`, err.message),
        );
    });
  }
}
