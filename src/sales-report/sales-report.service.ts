import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SalesReportDTO } from './sales-report.dto';

@Injectable()
export class SalesReportService {
  constructor(private prisma: PrismaService) {}

  // Générer un rapport de ventes
  async generateSalesReport(): Promise<SalesReportDTO> {
    // Exemple de logique pour générer un rapport de ventes
    const report = await this.prisma.order.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      _count: {
        id: true,
      },
    });

    // Transformation des données
    return {
      productId: report[0].productId,
      quantitySold: report[0]._sum.quantity,
      totalRevenue: report[0]._sum.quantity * 20, // Supposons que chaque produit vaut 20
      createdAt: new Date(),
    };
  }

  // Obtenir tous les rapports de ventes
  async getSalesReports(): Promise<SalesReportDTO[]> {
    return this.prisma.salesReport.findMany(); // Récupère les rapports depuis la base de données
  }
}
