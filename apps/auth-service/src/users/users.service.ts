import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Створення юзера
  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  // Логін
  async login(email: string, pass: string) {
    // findOne тепер розуміє тип email автоматично
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'] // ЯВНО додаємо пароль для перевірки
    });

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        return {
          message: 'Успішний вхід',
          userId: user.id,
          email: user.email,
        };
      }
    }

    throw new UnauthorizedException('Неправильний логін чи пароль');
  }

  // Отримання всіх
  async findAll() {
    return await this.usersRepository.find();
  }

  // Отримання одного (UUID завжди string)
  async findOne(id: string) {
    return await this.usersRepository.findOne({ 
      where: { id } 
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Оновлення
  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Видалення
  async remove(id: string) {
    await this.usersRepository.delete(id);
    return { deleted: true };
  }
}