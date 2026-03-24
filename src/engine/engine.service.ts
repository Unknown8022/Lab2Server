import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { Engine } from './entities/engine.entity';
import { Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class EngineService {
  private readonly logger = new Logger(EngineService.name);
  private enginesList: Engine[] = [];

  constructor() {
    this.logger.log('Ініціалізація списку двигунів (100,000 одиниць)...');

    this.enginesList = Array.from({ length: 100000 }, (_, index) => {
      const id = index + 1;
      const newEngine = new Engine();

      newEngine.id = id;
      newEngine.power = id * 10;
      newEngine.type = id % 2 === 0 ? 'Electric' : 'Hydraulic';
      // 2. Використовуємо undefined або cast до any, якщо в entity зв'язок суворий
      newEngine.prosthesis = undefined as any;

      return newEngine;
    });

    this.logger.log('Список двигунів успішно створено.');
  }

  create(createEngineDto: any) {
    this.logger.log('Спроба створення нового двигуна...');

    const id = this.enginesList.length + 1;
    const newEngine: Engine = {
      id: id,
      power: createEngineDto.power || 100,
      type: createEngineDto.type || 'Electric',
      prosthesis: undefined as any, // Виправляємо помилку з null
    };

    this.enginesList.push(newEngine);
    this.logger.debug(`Двигун #${id} створено успішно`);
    return newEngine;
  }

  findAll() {
    return this.enginesList;
  }

  findOne(id: number) {
    const engine = this.enginesList.find((e) => e.id === id);
    if (!engine) {
      // 3. Тепер NotFoundException буде знайдено завдяки імпорту зверху
      throw new NotFoundException(`Engine #${id} not found`);
    }
    return engine;
  }

  update(targetId: number, updateEngineDto: UpdateEngineDto) {
    console.time('ClassicForLoopUpdate');

    let updatedObject: Engine | null = null;

    // Використовуємо класичний цикл for з лічильником
    for (let i = 0; i < this.enginesList.length; i++) {
      if (this.enginesList[i].id === targetId) {
        // Отримуємо посилання на об'єкт за індексом і оновлюємо його
        Object.assign(this.enginesList[i], updateEngineDto);

        updatedObject = this.enginesList[i];

        // Зупиняємо цикл, як тільки знайшли і оновили
        break;
      }
    }

    console.timeEnd('ClassicForLoopUpdate');
    return updatedObject;
  }

  remove(targetId: number) {
    // 1. Спочатку шукаємо об'єкт в оригінальному масиві
    const engineToDelete = this.enginesList.find(
      (engine) => engine.id === targetId,
    );

    // 2. Якщо об'єкт не знайдено — кидаємо помилку (це краще, ніж повертати рядок)
    if (!engineToDelete) {
      // В NestJS прийнято використовувати вбудовані Exception
      return `Engine with ID = ${targetId} not found`;
    }

    // 3. Якщо знайшли — видаляємо
    this.enginesList = this.enginesList.filter(
      (engine) => engine.id !== targetId,
    );

    // 4. Повертаємо об'єкт, який видалили (щоб фронтенд знав, що саме зникло)
    return engineToDelete;
  }
}
