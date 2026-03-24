import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProsthesisModule } from './prosthesis/prosthesis.module';
import { User } from './users/entities/user.entity';
import { Prosthesis } from './prosthesis/entities/prosthesis.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_o1n6kFxDymrB@ep-misty-cherry-a9uqk2tp-pooler.gwc.azure.neon.tech/neondb?sslmode=require',
      entities: [User, Prosthesis],
      synchronize: true,
      ssl: true,
      extra: { ssl: { rejectUnauthorized: false } },
    }),
    UsersModule,
    ProsthesisModule,
  ],
})
export class AppModule {}
