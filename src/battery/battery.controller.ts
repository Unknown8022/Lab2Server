import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BatteryService } from './battery.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';

@Controller('battery')
export class BatteryController {
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
    return this.batteryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatteryDto: UpdateBatteryDto) {
    console.log(`PATCH request: /battery/${id}`);
    return this.batteryService.update(+id, updateBatteryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(`DELETE request: /battery/${id}`);
    return this.batteryService.remove(+id);
  }
  @Get('search/filter')
  filterByVoltage(@Query('min') min: number) {
    return this.batteryService.findByVoltage(min);
  }
  @Get(':id/health-check')
  async getHealth(@Param('id') id: string) {
    const battery = await this.batteryService.findOne(+id);

    if (!battery) {
      return { error: 'Battery not found' };
    }

    const isOverheating = battery.temperature > 45;
    const chargeLevel = ((battery.voltage - 3.2) / (4.2 - 3.2)) * 100;

    let status = 'Excellent';
    if (chargeLevel < 20) status = 'Low Battery';
    if (isOverheating) status = 'CRITICAL: OVERHEAT';

    return {
      batteryId: id,
      percentage: `${chargeLevel.toFixed(1)}%`,
      healthStatus: status,
      canOperate: !isOverheating && chargeLevel > 5,
      timestamp: new Date(),
    };
  }
  @Get(':id/sensors/:sensorId')
  async getDeepData(
    @Param('id') cartId: string,
    @Param('sensorId') speakerId: string,
  ) {
    return {
      message: 'Глибоко вкладений ресурс',
      providedCartId: cartId,
      providedSpeakerId: speakerId,
      timestamp: new Date().toISOString(),
    };
  }
}
