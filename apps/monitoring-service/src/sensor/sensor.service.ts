import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor } from '@app/common';

@Injectable()
export class SensorService {
  private readonly logger = new Logger(SensorService.name);

  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}

  async create(createSensorDto: CreateSensorDto) {
    this.logger.log('Спроба створення нового датчика в БД Neon...');

    const newSensor = this.sensorRepository.create({
      ...createSensorDto,
    });

    const savedSensor = await this.sensorRepository.save(newSensor);

    this.logger.debug(
      `Датчик створено успішно в БД: ${JSON.stringify(savedSensor)}`,
    );
    return savedSensor;
  }

  async findAll() {
    const sensors = await this.sensorRepository.find({
      relations: ['prostheses'],
    });

    this.logger.log(
      `Запит на отримання всіх датчиків з БД. Знайдено: ${sensors.length}`,
    );
    return sensors;
  }

  async findOne(id: string) {
    const sensor = await this.sensorRepository.findOne({
      where: { id },
      relations: ['prostheses'],
    });

    if (!sensor) {
      this.logger.warn(`Датчик з ID ${id} не знайдено`);
      throw new NotFoundException(`Sensor with ID ${id} not found`);
    }

    return sensor;
  }
  async update(id: string, updateSensorDto: UpdateSensorDto) {
    const sensor = await this.findOne(id);
    Object.assign(sensor, updateSensorDto);
    return await this.sensorRepository.save(sensor);
  }

  async remove(id: string) {
    const sensor = await this.findOne(id);
    await this.sensorRepository.remove(sensor);
    this.logger.log(`Датчик з ID ${id} видалено`);
    return { message: `Sensor #${id} deleted successfully` };
  }
}
