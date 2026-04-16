import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from '../../../../../libs/common/src/entities/sensor.entity';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],

  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
