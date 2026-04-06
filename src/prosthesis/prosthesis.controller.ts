import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProsthesisService } from './prosthesis.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('prosthesis')
export class ProsthesisController {
  constructor(private readonly service: ProsthesisService) {}
  @Post()
  async create(@Body() data: any) {
    return await this.service.create(data);
  }
  @Get()
  async findAll() {
    return await this.service.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id/sensors/:sensorId')
  getSensorData(@Param('id') id: string, @Param('sensorId') sensorId: string) {
    return {
      status: 'active',
      prosthesisId: id,
      sensor: sensorId,
      data: {
        value: (Math.random() * 5).toFixed(2) + ' mV',
        battery: '94%',
      },
      message: 'Дані отримано через JWT-захист',
    };
  }
}
