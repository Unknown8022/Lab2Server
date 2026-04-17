import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// Імпортуємо правильну назву файлу, яку видно на скріншоті
import { MonitoringServiceModule } from './monitoring-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MonitoringServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'monitoring_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
  console.log('🚀 Monitoring Microservice is running via RabbitMQ');
}
bootstrap();
