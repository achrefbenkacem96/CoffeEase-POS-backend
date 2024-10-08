import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CategoryService, CategoryResolver, PrismaService],
})
export class CategoryModule {}
