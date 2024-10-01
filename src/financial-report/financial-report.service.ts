import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FinancialReportDTO } from './financial-report.dto';

@Injectable()
export class FinancialReportService {
  constructor(private prisma: PrismaService) {}

  // Générer un rapport financier
  async generateFinancialReport(): Promise<FinancialReportDTO> {
    const totalRevenue = await this.prisma.order.aggregate({
      _sum: { quantity: true },
    });

    const totalExpenses = await this.prisma.payment.aggregate({
      _sum: { amount: true },
    });

    const profitOrLoss = (totalRevenue._sum.quantity ?? 0) - (totalExpenses._sum.amount ?? 0);

    const report = await this.prisma.financialReport.create({
      data: {
        totalRevenue: totalRevenue._sum.quantity ?? 0,
        totalExpenses: totalExpenses._sum.amount ?? 0,
        profitOrLoss: profitOrLoss,
      },
    });

    return report;
  }

  // Obtenir tous les rapports financiers
  async getFinancialReports(): Promise<FinancialReportDTO[]> {
    return this.prisma.financialReport.findMany();
  }
}
