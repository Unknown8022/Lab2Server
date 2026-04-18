import { Injectable, Logger } from '@nestjs/common';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Battery } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProsthesisService } from '../prosthesis/prosthesis.service';
import { SensorService } from '../sensor/sensor.service';

@Injectable()
export class BatteryService {
  private readonly logger = new Logger(BatteryService.name);
  constructor(
    @InjectRepository(Battery)
    private readonly batteryRepository: Repository<Battery>,
    private readonly prosthesisService: ProsthesisService,
    private readonly sensorService: SensorService,
  ) {}
  create(createBatteryDto: CreateBatteryDto) {
    console.log('--- Battery: Creating New Entry ---');
    console.log('Input data:', createBatteryDto);

    const newBattery = {
      ...createBatteryDto,
    };
    const createdBattery = this.batteryRepository.create(newBattery);
    this.batteryRepository.save(createdBattery);
    console.log('Saved Battery:', createdBattery);
    return createdBattery;
  }

  async findAll() {
    const batteryList = await this.batteryRepository.find();
    console.log(
      `--- Battery: Fetching all units (Total: ${batteryList.length}) ---`,
    );
    return batteryList;
  }

  async findOne(bId: number) {
    console.log(`--- Battery: Searching for ID #${bId} ---`);
    const battery = this.batteryRepository.findOne({ where: { id: bId } });
    return battery;
  }

  async update(bId: number, updateBatteryDto: UpdateBatteryDto) {
    console.time('DBUpdate');

    const battery = await this.findOne(bId); // перевірка інснування
    Object.assign(battery!, updateBatteryDto);
    const updated = await this.batteryRepository.save(battery!);

    console.timeEnd('DBUpdate');
    return updated;
  }

  async remove(bId: number) {
    console.log(`--- Battery: Removing ID #${bId} ---`);
    const batteryToDelete = await this.findOne(bId);
    await this.batteryRepository.remove(batteryToDelete!);
    this.logger.warn(`Батарею #${bId} видалено з бази`);
    return batteryToDelete;
  }

  findByVoltage(minVoltage: number) {
    return this.batteryRepository.find({
      where: { voltage: Number(minVoltage) },
    });
  }

  findSensorInBattery(batteryId: number, sensorId: number) {
    return {
      parentBattery: Number(batteryId),
      sensorDetail: `Дані для сенсора ${sensorId}`,
      value: (Math.random() * 5).toFixed(2),
      status: 'Active',
    };
  }

  async calculateHealth(id: string) {
    const battery = await this.findOne(+id);

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
  async getProsthesisSensorData(prosthesisId: string, sensorId: string) {
    const prosthesis = await this.prosthesisService.findOne(+prosthesisId);
    const sensor = await this.sensorService.findOne(+sensorId);
    this.logger.warn(prosthesis, sensor);
    return {
      status: 'success',
      prosthesisId: prosthesis.id,
      prosthesisName: prosthesis.modelName,
      sensor: {
        id: sensor.id,
        type: sensor.type,
        reading: sensor.value,
        calibrationDate: new Date().toISOString(),
      },
      battery: prosthesis.batteryLevel,
      timestamp: new Date().getTime(),
    };
  }
}
