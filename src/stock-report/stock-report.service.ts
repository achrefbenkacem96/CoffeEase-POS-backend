import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StockReport } from '@prisma/client';

@Injectable()
export class StockReportService {
  constructor(private prisma: PrismaService) {}

  async generateStockReport(productId: number): Promise<StockReport> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
  
    if (!product) {
      throw new Error("Produit non trouvé");
    }
  
    const stockReport = await this.prisma.stockReport.create({
      data: {
        productId: product.id,
        stockBefore: product.stock,
        stockAfter: product.stock - 10, // Exemples de données
        movement: 'retrait',
      },
      include: {
        product: true, // Inclure les informations sur le produit
      },
    });
  
    return stockReport;
  }
  
  // Récupérer tous les rapports de stock
  async getStockReports(): Promise<StockReport[]> {
    return this.prisma.stockReport.findMany({
      include: {
        product: true,  // Inclure les détails du produit associé
      },
    });
  }
}
