import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProsthesisModule } from '../../monitoring-service/src/prosthesis/prosthesis.module';
import { UsersModule } from '../../auth-service/src/users/users.module';
import { SensorModule } from '../../monitoring-service/src/battery/sensor/sensor.module';
import { FilesModule } from '../../storage-service/src/files/files.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics', // Метрики будуть тут
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_o1n6kFxDymrB@ep-misty-cherry-a9uqk2tp-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require', // Замініть на свій рядок підключення
      // Автоматичне завантаження всіх сутностей (entity)
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
        'dist/libs/common/**/*.entity{.ts,.js}',
      ],
      // Налаштування для Завдання 2: Міграції
      synchronize: true, // ВИМКНЕНО для використання міграцій
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: true, // Автозапуск міграцій при старті сервера
      ssl: {
        rejectUnauthorized: false, // Необхідно для підключення до Neon
      },
    }),
    UsersModule,
    ProsthesisModule,
    SensorModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
