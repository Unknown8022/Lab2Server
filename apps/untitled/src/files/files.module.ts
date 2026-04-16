import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PublicFile } from './entities/public-file.entity'; // Твоя сутність
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    // 1. Реєструємо сутність у TypeORM
    TypeOrmModule.forFeature([PublicFile]),
  ],
  providers: [
    FilesService,
    // 2. Створюємо кастомний провайдер для метрики Prometheus
    makeCounterProvider({
      name: 'google_drive_uploads_total',
      help: 'Total number of uploads to Google Drive',
      labelNames: ['status'],
    }),
  ],
  controllers: [FilesController],
  // 3. Експортуємо сервіс, щоб SensorModule міг його використовувати
  exports: [FilesService],
})
export class FilesModule {}
