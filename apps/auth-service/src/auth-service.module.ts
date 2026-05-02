import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthServiceService } from './auth-service.service';
import { AuthServiceController } from './auth-service.controller';
import { UsersModule } from './users/users.module';
import { AppDataSource } from '../../untitled/src/data-source';

// Імпорт сутностей (Entities)
import { User, Engine, Sensor, Battery, Prosthesis } from '@app/common';
import { Webhook } from 'apps/monitoring-service/src/prosthesis/entities/webhook.entity';

// Імпорт контролера та сервісу вебхуків з іншого модуля (Monitoring Service)
import { WebhooksController } from '../../monitoring-service/src/webhooks/webhooks.controller';
import { MonitoringServiceService } from '../../monitoring-service/src/monitoring-service.service';

@Module({
  imports: [
    // Конфігурація підключення до бази даних (використовуємо існуючий AppDataSource)
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      // Додаємо Webhook у список сутностей, щоб TypeORM створив таблицю
      entities: [User, Webhook, Engine, Sensor, Battery, Prosthesis],
      autoLoadEntities: true,
      synchronize: true, // Вмикаємо авто-синхронізацію для розробки/лаби
    }),

    // Реєструємо репозиторії для використання в сервісах цього модуля
    TypeOrmModule.forFeature([User, Webhook]),

    // Підключаємо модуль користувачів
    UsersModule,

    // Налаштування JWT для авторизації
    JwtModule.register({
      global: true,
      secret: 'areu1or0?', // Твій секретний ключ
      signOptions: { expiresIn: '1h' }, // Токен діє 1 годину
    }),
  ],
  controllers: [
    AuthServiceController,
    // ДОДАЄМО СЮДИ: тепер цей контролер буде слухати порт 3000
    WebhooksController,
  ],
  providers: [
    AuthServiceService,
    // ДОДАЄМО СЮДИ: сервіс необхідний для роботи контролера вебхуків
    MonitoringServiceService,
  ],
  exports: [AuthServiceService],
})
export class AuthServiceModule {}
