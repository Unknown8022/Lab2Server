import { Module } from '@nestjs/common';
import { BatteryService } from './battery.service';
import { BatteryController } from './battery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battery } from '@app/common';
import { ProsthesisModule } from '../prosthesis/prosthesis.module';
import { SensorModule } from '../sensor/sensor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Battery]),
    ProsthesisModule,
    SensorModule,
  ],
  controllers: [BatteryController],
  providers: [BatteryService],
})
export class BatteryModule {}
