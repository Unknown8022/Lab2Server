import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProsthesisController } from './prosthesis.controller';
import { ProsthesisService } from './prosthesis.service';
import { Prosthesis } from './entities/prosthesis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prosthesis])],
  controllers: [ProsthesisController],
  providers: [ProsthesisService],
})
export class ProsthesisModule {}
