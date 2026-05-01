import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { BatteryService } from './battery.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Battery } from '@app/common';
import { ProsthesisService } from '../prosthesis/prosthesis.service';
import { SensorService } from '../sensor/sensor.service';

@Controller('battery')
export class BatteryController {
  private readonly logger = new Logger(BatteryController.name);
  constructor(private readonly batteryService: BatteryService) {}

  @Post()
  create(@Body() createBatteryDto: CreateBatteryDto) {
    console.log('POST request: /battery');
    return this.batteryService.create(createBatteryDto);
  }

  @Get()
  findAll() {
    console.log('GET request: /battery');
    return this.batteryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`GET request: /battery/${id}`);
    return this.batteryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatteryDto: UpdateBatteryDto) {
    console.log(`PATCH request: /battery/${id}`);
    return this.batteryService.update(id, updateBatteryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(`DELETE request: /battery/${id}`);
    return this.batteryService.remove(id);
  }

  @Get('search/filter')
  filterByVoltage(@Query('min') min: number) {
    return this.batteryService.findByVoltage(min);
  }

  @Get(':id/health-check')
  async getHealth(@Param('id') id: string) {
    let result = this.batteryService.calculateHealth(id);
    console.log(`Battery info:${result}`);
    return result;
  }

  @Get(':prosthesisId/sensors/:sensorId')
  async showProsthesisSensorData(
    @Param('prosthesisId') prosthesisId: string,
    @Param('sensorId') sensorId: string,
  ) {
    return this.batteryService.getProsthesisSensorData(prosthesisId, sensorId);
  }
}
