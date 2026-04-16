import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProsthesisService } from './prosthesis.service';
import { ProsthesisController } from './prosthesis.controller';
import { Prosthesis } from '../../../../libs/common/src/entities/prosthesis.entity';
import { Sensor } from '../../../../libs/common/src/entities/sensor.entity';

@Module({
  imports: [
    // Реєструємо обидві сутності, щоб TypeORM бачив їхні метадані
    TypeOrmModule.forFeature([Prosthesis, Sensor]),
  ],
  controllers: [ProsthesisController],
  providers: [ProsthesisService],
  exports: [TypeOrmModule],
})
export class ProsthesisModule {}
