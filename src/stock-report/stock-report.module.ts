import { Module } from '@nestjs/common';
import { StockReportService } from './stock-report.service';
import { StockReportResolver } from './stock-report.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [StockReportService, StockReportResolver, PrismaService],
})
export class StockReportModule {}
