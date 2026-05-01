import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    ForbiddenException, 
    UnauthorizedException 
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { UserRole } from '../entities/user.entity'; // Перевір правильність шляху
  import { ROLES_KEY } from '../decorators/roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      // 1. Отримуємо ролі, встановлені через @Roles()
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      // Якщо метод не захищений ролями — пускаємо всіх
      if (!requiredRoles) {
        return true;
      }
  
      // 2. Беремо запит та юзера
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      // ВАЖЛИВО: RolesGuard спрацює лише якщо юзер вже є в запиті (після AuthGuard)
      if (!user) {
        throw new UnauthorizedException('Користувач не авторизований');
      }
  
      // 3. Перевірка доступу
      const hasRole = requiredRoles.some((role) => user.role === role);
  
      if (!hasRole) {
        throw new ForbiddenException(`Доступ заборонено. Необхідна роль: ${requiredRoles}`);
      }
  
      return true;
    }
  }