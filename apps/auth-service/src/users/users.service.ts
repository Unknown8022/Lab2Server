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
    private usersRepository: Repository<User>,
  ) {}

  // Основний метод створення юзера
  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  // Метод для входу
  async login(email: string, pass: string) {
    // Шукаємо користувача по email
    const user = await this.usersRepository.findOne({
      where: { email } as any,
    });

    if (user) {
      // Порівняння пароля та хешу
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        return {
          message: 'Успішний вхід',
          userId: user.id,
          email: user.email,
        };
      }
    }

    // Якщо щось пішло не так
    throw new UnauthorizedException('Неправильний логін чи пароль');
  }

  //CRUD
  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } as any });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return { deleted: true };
  }
}
