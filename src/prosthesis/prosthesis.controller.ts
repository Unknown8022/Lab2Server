import { Controller, Get, Param } from '@nestjs/common';

@Controller('prosthesis')
export class ProsthesisController {
  @Get(':id/sensors/:sensorId')
  getSensorData(@Param('id') id: string, @Param('sensorId') sensorId: string) {
    return {
      status: 'active',
      prosthesisId: id,
      sensor: sensorId,
      data: {
        value: (Math.random() * 5).toFixed(2) + ' mV',
        battery: '92%'
      },
      message: 'Телеметрія отримана успішно'
    };
  }
}
