import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return this.authService.login(user);
    } else {
      return { error: 'Invalid credentials' };
    }
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string; role: string }) {
    return this.authService.register(body.email, body.password, body.role);
  }
}
