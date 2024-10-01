import { Resolver, Query } from '@nestjs/graphql';
import { SalesReportService } from './sales-report.service';
import { SalesReportDTO } from './sales-report.dto';

@Resolver(() => SalesReportDTO)
export class SalesReportResolver {
  constructor(private salesReportService: SalesReportService) {}

  // Mutation pour générer un rapport de ventes
  @Query(() => SalesReportDTO)
  async generateSalesReport() {
    return this.salesReportService.generateSalesReport();
  }

  // Requête pour récupérer tous les rapports de ventes
  @Query(() => [SalesReportDTO])
  async getSalesReports() {
    return this.salesReportService.getSalesReports();
  }
}
