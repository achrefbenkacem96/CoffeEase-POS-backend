import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SalesReportDTO } from './sales-report.dto';

@Injectable()
export class SalesReportService {
  constructor(private prisma: PrismaService) {}

  // Générer un rapport de ventes pour tous les produits
  // SalesReportService.ts
async generateSalesReport(): Promise<SalesReportDTO[]> {
  // Regroupe par produit
  const report = await this.prisma.order.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
  });

  // Ajoute une vérification que chaque produit est trouvé
  const productIds = report.map(r => r.productId);
  const products = await this.prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true },
  });

  return report.map((r) => {
    const product = products.find(p => p.id === r.productId);
    const quantitySold = r._sum.quantity || 0;
    const totalRevenue = quantitySold * (product?.price || 0);

    return {
      productId: r.productId,
      quantitySold,
      totalRevenue,
      createdAt: new Date(),
    };
  });
}


  // Obtenir tous les rapports de ventes déjà générés
  async getSalesReports(): Promise<SalesReportDTO[]> {
    return this.prisma.salesReport.findMany();
  }
}
