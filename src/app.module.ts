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
      url: 'ВАШ_URL_ВІД_NEON', // Замініть на свій рядок підключення
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
