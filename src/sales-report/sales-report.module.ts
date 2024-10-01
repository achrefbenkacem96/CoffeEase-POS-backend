import { Module } from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { SalesReportResolver } from './sales-report.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [SalesReportService, SalesReportResolver, PrismaService],
})
export class SalesReportModule {}
