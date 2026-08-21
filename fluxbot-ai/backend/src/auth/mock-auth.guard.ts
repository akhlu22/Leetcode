import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../common/decorators/roles.decorator';

@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Mock auth for local integration; replace with JWT/OIDC in production.
    const roleHeader = String(request.headers['x-user-role'] ?? 'ACCOUNTANT').toUpperCase();
    const role: Role = roleHeader === 'CFO_CONTROLLER' ? 'CFO_CONTROLLER' : 'ACCOUNTANT';

    request.user = {
      id: request.headers['x-user-id'] ?? 'system-user',
      role,
    };

    return true;
  }
}
