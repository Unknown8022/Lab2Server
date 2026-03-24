import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('prosthesis')
export class ProsthesisController {
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
