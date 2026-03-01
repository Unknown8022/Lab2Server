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
}
