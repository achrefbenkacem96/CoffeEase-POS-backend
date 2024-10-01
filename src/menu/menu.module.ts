import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [MenuService, MenuResolver, PrismaService],
})
export class MenuModule {}
