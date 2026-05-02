import { Controller, Post, Body } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';

@Controller('auth') // Тепер запити йтимуть на /auth/login
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }
}
