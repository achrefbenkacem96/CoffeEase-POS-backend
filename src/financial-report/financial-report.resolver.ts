import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { FinancialReportService } from './financial-report.service';
import { FinancialReportDTO } from './financial-report.dto';

@Resolver(() => FinancialReportDTO)
export class FinancialReportResolver {
  constructor(private financialReportService: FinancialReportService) {}

  // Mutation pour générer un rapport financier
  @Mutation(() => FinancialReportDTO)
  async generateFinancialReport() {
    return this.financialReportService.generateFinancialReport();
  }

  // Requête pour obtenir tous les rapports financiers
  @Query(() => [FinancialReportDTO])
  async getFinancialReports() {
    return this.financialReportService.getFinancialReports();
  }
}
