import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { UsersModule } from './users/users.module'; // Імпорт твого модуля
import { AppDataSource } from '../../untitled/src/data-source'; // Наш конфіг БД

@Module({
  imports: [
    // 1. Підключаємо базу даних через опції нашого DataSource
    TypeOrmModule.forRoot(AppDataSource.options), 
    // 2. Підключаємо модуль користувачів, де лежить UsersController
    UsersModule, 
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}