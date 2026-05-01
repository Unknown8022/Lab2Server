import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Engine } from '@app/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';

@Injectable()
export class EngineService  {
  private readonly logger = new Logger(EngineService.name);

  constructor(
    @InjectRepository(Engine)
    private readonly engineRepository: Repository<Engine>,
  ) {}

  // конструктор
  // async onModuleInit() {
  //   const count = await this.engineRepository.count();
  //   if (count === 0) {
  //     this.logger.log('БД пуста. Ініціалізація 100 одиниць для тесту...');
  //     const demoEngines = Array.from({ length: 100 }, (_, index) => {
  //       const id = index + 1;
  //       return this.engineRepository.create({
  //         power: id * 10,
  //         type: id % 2 === 0 ? 'Electric' : 'Hydraulic',
  //       });
  //     });
  //     await this.engineRepository.save(demoEngines);
  //     this.logger.log('Демо-двигуни успішно додані в Neon.');
  //   }
  // }

  async create(createEngineDto: CreateEngineDto) {
    this.logger.log('Спроба створення нового двигуна в БД...');
    
    // Використовуйте розгортання об'єкта (...), щоб прийняти ВСІ поля з DTO
    const newEngine = this.engineRepository.create(createEngineDto);
  
    const saved = await this.engineRepository.save(newEngine);
    this.logger.debug(`Двигун #${saved.id} збережено в Neon`);
    return saved;
  }

  async findAll() {
    // relations
    return await this.engineRepository.find({ relations: ['prosthesis'] });
  }

  async findOne(id: string) {
    const engine = await this.engineRepository.findOne({
      where: { id },
      relations: ['prosthesis'],
    });
    if (!engine) {
      throw new NotFoundException(`Engine #${id} not found in database`);
    }
    return engine;
  }

  async update(id: string, updateEngineDto: UpdateEngineDto) {
    console.time('DBUpdate');

    const engine = await this.findOne(id); // перевірка інснування
    Object.assign(engine, updateEngineDto);
    const updated = await this.engineRepository.save(engine);

    console.timeEnd('DBUpdate');
    return updated;
  }

  async remove(id: string) {
    const engineToDelete = await this.findOne(id);
    await this.engineRepository.remove(engineToDelete);
    this.logger.warn(`Двигун #${id} видалено з бази`);
    return engineToDelete;
  }
}
