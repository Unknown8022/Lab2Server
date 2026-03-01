import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor } from './entities/sensor.entity';

@Injectable()
export class SensorService {
  // Створюємо екземпляр логера саме для цього сервісу
  private readonly logger = new Logger(SensorService.name);
  private sensors: Sensor[] = [];

  create(createSensorDto: CreateSensorDto) {
    this.logger.log('Спроба створення нового датчика...');

    const newSensor: Sensor = {
      id: this.sensors.length + 1,
      ...createSensorDto,
    };

    this.sensors.push(newSensor);

    // Виводимо об'єкт у консоль для перевірки
    this.logger.debug(`Датчик створено успішно: ${JSON.stringify(newSensor)}`);
    return newSensor;
  }

  findAll() {
    this.logger.log(
      `Запит на отримання всіх датчиків. Знайдено: ${this.sensors.length}`,
    );
    return this.sensors;
  }

  findOne(id: number) {
    const sensor = this.sensors.find((sensor) => sensor.id === id);
    if (!sensor) {
      this.logger.error(`Помилка: Датчик з ID ${id} не знайдено!`);
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }
    return sensor;
  }

  update(id: number, updateSensorDto: UpdateSensorDto) {
    this.logger.warn(`Оновлення датчика #${id}...`);

    const sensorIndex = this.sensors.findIndex((sensor) => sensor.id === id);

    if (sensorIndex === -1) {
      this.logger.error(`Не вдалося оновити: Датчик #${id} відсутній`);
      throw new NotFoundException(`Sensor #${id} not found`);
    }

    const updatedSensor = { ...this.sensors[sensorIndex], ...updateSensorDto };
    this.sensors[sensorIndex] = updatedSensor;

    this.logger.log(`Дані датчика #${id} успішно оновлено`);
    return updatedSensor;
  }

  remove(id: number) {
    this.logger.warn(`Видалення датчика #${id} з системи`);
    const sensor = this.findOne(id);
    this.sensors = this.sensors.filter((sensor) => sensor.id !== id);
    return sensor;
  }
}
