import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
}
