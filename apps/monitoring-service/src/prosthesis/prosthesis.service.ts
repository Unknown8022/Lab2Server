import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Prosthesis, Sensor } from '@app/common';
import { CreateProsthesisWithSensorsDto } from './dto/porst-and-senesor.dto';

@Injectable()
export class ProsthesisService {
  private readonly logger = new Logger(ProsthesisService.name);
  constructor(
    @InjectRepository(Prosthesis)
    private repo: Repository<Prosthesis>,
    @InjectRepository(Sensor) private sRepo: Repository<Sensor>,
  ) {}

  async create(data: any) {
    const prosthesis = this.repo.create(data);
    return await this.repo.save(prosthesis);
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['user'], // Чтобы мы могли проверить владельца
    });
    if (!item) throw new NotFoundException(`Prosthesis #${id} not found`);
    return item;
  }

  async findAll() {
    return await this.repo.find({ relations: ['user', 'sensors', 'engine'] });
  }
  async createWithSensors(dto: CreateProsthesisWithSensorsDto) {
    // 1. Знаходимо сенсори за ID
    const sensors = await this.sRepo.findBy({ id: In(dto.sensorIds) });
    this.logger.debug('DTO Values:', {
      userId: dto.userId,
      engineId: dto.engineId,
      sensors: sensors,
    });
    // 2. Створюємо об'єкт протеза
    const prosthesis = this.repo.create({
      modelName: dto.modelName,
      batteryLevel: dto.batteryLevel,
      //user: { id: dto.userId },
      //engine: { id: dto.engineId },
      sensors: sensors, // Прив'язуємо знайдені сенсори
    });
    this.logger.debug(prosthesis);

    const saved = await this.repo.save(prosthesis);
    this.logger.warn(`saved${saved}`);
    return saved;
  }
}
