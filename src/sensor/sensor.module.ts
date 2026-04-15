import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor]), FilesModule],

  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
