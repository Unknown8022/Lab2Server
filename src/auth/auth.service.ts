import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string, isAdmin: boolean) {
    const repo = isAdmin ? this.adminRepository : this.userRepository;
    const account = await repo.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (account && (await bcrypt.compare(pass, account.password))) {
      const { password, ...result } = account;
      return { ...result, role: isAdmin ? 'admin' : 'user' };
    }
    return null;
  }
  async validate(payload: any) {
    // Повертаємо об'єкт користувача з токена в request.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
  async login(account: any) {
    const payload = {
      email: account.email,
      sub: account.id,
      role: account.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
