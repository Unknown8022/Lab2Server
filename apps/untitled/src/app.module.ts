import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices'; // Додай цей імпорт
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
      path: '/metrics',
    }),
    // Налаштування RabbitMQ клієнта
    ClientsModule.register([
      {
        name: 'MONITORING_RMQ', // Ім'я для ін'єкції в контролерах
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // Адреса твого RabbitMQ в Docker
          queue: 'monitoring_queue', // Назва черги
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_o1n6kFxDymrB@ep-misty-cherry-a9uqk2tp-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
        'dist/libs/common/**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
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
