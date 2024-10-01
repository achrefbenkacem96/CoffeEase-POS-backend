import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [forwardRef(() => AuthModule)],  // Utiliser forwardRef pour éviter la dépendance circulaire
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],  // Exporter UserService
})
export class UserModule {}
