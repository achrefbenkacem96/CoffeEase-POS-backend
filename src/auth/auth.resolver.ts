import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.response'; // DTO pour la réponse de connexion
import { UserDTO } from '../users/user.dto';

@Resolver(() => UserDTO)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const user = await this.authService.validateUser(email, password);
    if (user) {
      return this.authService.login(user);
    } else {
      throw new Error('Invalid credentials');
    }
  }

  @Mutation(() => Boolean)
  async requestPasswordReset(@Args('email') email: string): Promise<boolean> {
    await this.authService.createPasswordResetToken(email);
    return true; // Indique que la demande de réinitialisation a été effectuée
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string
  ): Promise<boolean> {
    return this.authService.resetPassword(token, newPassword);
  }
}
