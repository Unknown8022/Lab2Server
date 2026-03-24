import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProsthesisModule } from './prosthesis/prosthesis.module';
import { UsersModule } from './users/users.module';
import { SensorModule } from './sensor/sensor.module';
import { EngineModule } from './engine/engine.module';
import { BatteryModule } from './battery/battery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_o1n6kFxDymrB@ep-misty-cherry-a9uqk2tp-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require', // Замініть на свій рядок підключення
      // Автоматичне завантаження всіх сутностей (entity)
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // Налаштування для Завдання 2: Міграції
      synchronize: false, // ВИМКНЕНО для використання міграцій
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: true, // Автозапуск міграцій при старті сервера
      ssl: {
        rejectUnauthorized: false, // Необхідно для підключення до Neon
      },
    }),
    UsersModule,
    ProsthesisModule,
    SensorModule,
    EngineModule,
    BatteryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
