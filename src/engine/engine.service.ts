import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { Engine } from './entities/engine.entity';

@Injectable()
export class EngineService {
  private enginesList: Engine[] = [];
  constructor() {
    this.enginesList = Array.from({ length: 100000 }, (_, index) => {
      const id = index + 1;
      const newEngine = new Engine();
      newEngine.id = id;
      newEngine.name = `Model ${id}`;
      newEngine.rotationPerSecondSpeed = id;
      newEngine.voltage = id;
      newEngine.electricCurrent = id;
      return newEngine;
    });
  }
  create(createEngineDto: CreateEngineDto) {
    const { name, rotationPerSecondSpeed, voltage, electricCurrent } =
      createEngineDto;
    console.log(
      `serverlog ${name} - ${rotationPerSecondSpeed} ${voltage} ${electricCurrent}`,
    );
    const engineID = this.enginesList.length + 1;
    const newEngine = {
      id: engineID,
      ...createEngineDto,
    };
    this.enginesList.push(newEngine);
    console.log(newEngine);
    return newEngine;
  }

  findAll() {
    return this.enginesList;
  }
  findOne(id: number) {
    return `This action returns a #${id} engine`;
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
