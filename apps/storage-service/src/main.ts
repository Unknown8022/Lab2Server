import { NestFactory } from '@nestjs/core';
import { StorageServiceModule } from './storage-service.module';

async function bootstrap() {
  const app = await NestFactory.create(StorageServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
