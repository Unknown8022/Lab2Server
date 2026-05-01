import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '@app/common'; // Переконайся, що в цій лібі User — це Entity

@Module({
  imports: [
    // Реєструємо репозиторій User для цього модуля
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Експортуємо, щоб інші сервіси (наприклад, Auth) могли бачити UsersService
})
export class UsersModule {}
