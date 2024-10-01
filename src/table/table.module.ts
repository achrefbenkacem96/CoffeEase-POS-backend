import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableResolver } from './table.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TableService, TableResolver, PrismaService],
})
export class TableModule {}
