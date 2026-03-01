import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EngineModule } from './engine/engine.module';
import { SensorModule } from './sensor/sensor.module';
import { BatteryModule } from './battery/battery.module';

@Module({
  imports: [EngineModule, SensorModule, BatteryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
