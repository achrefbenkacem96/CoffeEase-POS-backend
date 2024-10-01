import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockResolver } from './stock.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [StockService, StockResolver, PrismaService],
})
export class StockModule {}
