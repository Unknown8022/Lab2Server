import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProsthesisService } from './prosthesis.service';
import { ProsthesisController } from './prosthesis.controller';
import { Prosthesis } from '../../../../libs/common/src/entities/prosthesis.entity';
import { Sensor } from '../../../../libs/common/src/entities/sensor.entity';
import { Webhook } from './entities/webhook.entity';

@Module({
  imports: [
    // Реєструємо обидві сутності, щоб TypeORM бачив їхні метадані
    TypeOrmModule.forFeature([Prosthesis, Sensor, Webhook]),
  ],
  controllers: [ProsthesisController],
  providers: [ProsthesisService],
  exports: [ProsthesisService],
})
export class ProsthesisModule {}
