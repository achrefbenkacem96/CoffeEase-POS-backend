import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StockReportService } from './stock-report.service';
import { StockReportDTO } from './stock-report.dto';

@Resolver(() => StockReportDTO)
export class StockReportResolver {
  constructor(private stockReportService: StockReportService) {}

  // Mutation pour générer un rapport de stock pour un produit spécifique
  @Mutation(() => StockReportDTO)
async generateStockReport(@Args('productId') productId: number) {
  return this.stockReportService.generateStockReport(productId);
}


  // Query pour récupérer tous les rapports de stock
  @Query(() => [StockReportDTO])
  async getStockReports() {
    return this.stockReportService.getStockReports();
  }
}
