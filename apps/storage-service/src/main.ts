import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { StorageModule } from './storage.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StorageModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001, // Порт для внутрішнього зв'язку
      },
    },
  );
  await app.listen();
  console.log('🚀 Storage Microservice is listening...');
}
bootstrap();
