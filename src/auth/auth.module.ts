import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';  // Utiliser forwardRef pour UserModule
import { PrismaService } from '../prisma.service';
import { EmailService } from '../services/email.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),  // Utiliser forwardRef pour éviter la dépendance circulaire
  ],
  providers: [AuthService, AuthResolver, PrismaService, EmailService],
  exports: [AuthService],  // Exporter AuthService
})
export class AuthModule {}
