import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UserDTO } from './user.dto';
import { Roles } from '../guards/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService  // Injecter AuthService pour hacher le mot de passe
  ) {}

  @Query(() => [UserDTO])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserDTO)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role') role: string
  ) {
    // Utilise AuthService pour gérer l'inscription avec le hachage du mot de passe
    return this.authService.register(email, password, role);
  }

  @Mutation(() => Boolean)
  @Roles('admin')  // Seuls les utilisateurs avec le rôle 'admin' peuvent accéder à cette mutation
  @UseGuards(RolesGuard)
  async updateUserRole(
    @Args('id') id: number,
    @Args('role') role: string
  ): Promise<boolean> {
    return this.userService.updateUserRole(id, role);
  }
}
