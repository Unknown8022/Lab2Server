import { Injectable } from '@nestjs/common';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Battery } from './entities/battery.entity';

@Injectable()
export class BatteryService {
  private batteryList: Battery[] = [];

  create(createBatteryDto: CreateBatteryDto) {
    console.log('--- Battery: Creating New Entry ---');
    console.log('Input data:', createBatteryDto);

    const newBattery: Battery = {
      id: this.batteryList.length + 1,
      ...createBatteryDto,
      temperature: 0,
    };

    this.batteryList.push(newBattery);
    console.log('Saved Battery:', newBattery);
    return newBattery;
  }

  findAll() {
    console.log(
      `--- Battery: Fetching all units (Total: ${this.batteryList.length}) ---`,
    );
    return this.batteryList;
  }

  findOne(id: number) {
    console.log(`--- Battery: Searching for ID #${id} ---`);
    return this.batteryList.find((battery) => battery.id === id);
  }

  update(id: number, updateBatteryDto: UpdateBatteryDto) {
    console.log(`--- Battery: Updating ID #${id} ---`);
    const battery = this.findOne(id);

    if (battery) {
      Object.assign(battery, updateBatteryDto);
      console.log('Updated State:', battery);
    }
    return battery;
  }

  remove(id: number) {
    console.log(`--- Battery: Removing ID #${id} ---`);
    const index = this.batteryList.findIndex((battery) => battery.id === id);
    if (index !== -1) {
      const removed = this.batteryList.splice(index, 1);
      return removed[0];
    }
    return null;
  }

  findByVoltage(minVoltage: number) {
    return this.batteryList.filter((b) => b.voltage >= Number(minVoltage));
  }

  findSensorInBattery(batteryId: number, sensorId: number) {
    return {
      parentBattery: Number(batteryId),
      sensorDetail: `Дані для сенсора ${sensorId}`,
      value: (Math.random() * 5).toFixed(2),
      status: 'Active',
    };
  }
  calculateHealth(id: number) {
    const battery = this.batteryList.find((b) => b.id === Number(id));
    if (!battery) return { error: 'Battery not found' };

    const healthPercentage = (battery.voltage / 4.2) * 100; //not real formula

    return {
      id: battery.id,
      health: `${healthPercentage.toFixed(1)}%`,
      status: healthPercentage > 80 ? 'Good' : 'Needs Maintenance',
      timestamp: new Date().toISOString(),
    };
  }
}
