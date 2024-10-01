import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    console.log('User dans RolesGuard:', user); // Pour vérifier que l'utilisateur et ses rôles sont bien récupérés

    if (!user) {
      throw new ForbiddenException('No user found in request');
    }

    const hasRole = () => roles.some((role) => user?.roles?.includes(role));
    if (!hasRole()) {
      throw new ForbiddenException('Forbidden resource');
    }

    return true;
  }
}
