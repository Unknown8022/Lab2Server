import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service'; // Перевір шлях до сервісу юзерів

@Injectable()
export class AuthServiceService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // В auth.service.ts
  async login(loginData: any) {
    // Приймаємо об'єкт
    const { email, password } = loginData; // Дістаємо дані всередині

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Користувача не знайдено');
    }

    // Оскільки у нас bcrypt, використовуємо compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Невірний пароль');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
