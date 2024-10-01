import { Module } from '@nestjs/common';
import { FinancialReportService } from './financial-report.service';
import { FinancialReportResolver } from './financial-report.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [FinancialReportService, FinancialReportResolver, PrismaService],
})
export class FinancialReportModule {}
