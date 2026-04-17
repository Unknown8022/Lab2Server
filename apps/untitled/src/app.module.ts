import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static'; // Імпортуємо модуль статики
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path'; // Імпортуємо join для роботи зі шляхами
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminGateway } from './admin.gateway';

@Module({
  imports: [
    // Налаштовуємо роздачу index.html
    ServeStaticModule.forRoot({
      // Цей шлях динамічно знаходить папку client в архітектурі monorepo
      rootPath: join(__dirname, '..', '..', '..', 'apps', 'untitled', 'client'),
      exclude: ['/api*'],
    }),
    // Налаштування RabbitMQ клієнта
    ClientsModule.register([
      {
        name: 'MONITORING_RMQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'monitoring_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AdminGateway],
})
export class AppModule {}
