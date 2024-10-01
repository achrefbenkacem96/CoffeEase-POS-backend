import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  // Fonction pour récupérer tous les mouvements de stock
  async getStocks() {
    return this.prisma.stock.findMany({
      include: {
        product: true,  // Inclure les détails du produit lié au mouvement de stock
      },
    });
  }

  // Fonction pour vérifier le stock et envoyer des alertes
  async checkStockLevels(productId: number): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (product && product.stock <= product.stockAlert) {
      console.log(`⚠️ Stock alert for product ${product.name}: Low stock!`);
      // Optionnel : envoyer un email ou une notification ici
    }
  }

  // Fonction pour mettre à jour le stock après une commande
  async updateStock(productId: number, quantity: number): Promise<void> {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });

    if (!product || product.stock < quantity) {
      throw new Error('Insufficient stock or product not found');
    }

    // Mettre à jour le stock du produit
    await this.prisma.product.update({
      where: { id: productId },
      data: { stock: product.stock - quantity },
    });

    // Enregistrer le mouvement de stock dans la table Stock
    await this.prisma.stock.create({
      data: {
        productId: productId,
        movement: 'retrait',  // Exemple de type de mouvement
        quantity: quantity,
      },
    });

    // Vérifier le stock après mise à jour
    await this.checkStockLevels(productId);
  }
}
