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

  async findOne(id: string) {
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
    const sensors = await this.sRepo.findBy({ 
      id: In(dto.sensorIds) 
    });

    // 2. Створюємо об'єкт протеза
    // Використовуємо кастинг 'as any' або чітко вказуємо об'єкти, 
    // бо TypeORM іноді суворо перевіряє зв'язки при створенні через .create()
    const prosthesis = this.repo.create({
      modelName: dto.modelName,
      batteryLevel: dto.batteryLevel,
      user: dto.userId ? ({ id: dto.userId } as any) : null,
      engine: dto.engineId ? ({ id: dto.engineId } as any) : null,
      sensors: sensors,
    });

    this.logger.debug('Mapped Prosthesis object:', prosthesis);

    const saved = await this.repo.save(prosthesis);
    this.logger.warn(`Successfully saved prosthesis with ID: ${saved.id}`);
    return saved;
  }
}
