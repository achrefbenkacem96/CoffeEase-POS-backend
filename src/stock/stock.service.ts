import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StockDTO } from './stock.dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  // Fonction pour récupérer tous les mouvements de stock
  async getStocks(): Promise<StockDTO[]> {
    return this.prisma.stock.findMany({
      include: {
        product: {
          include: {
            category: true,  // Inclure les détails de la catégorie du produit
          },
        },
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
  async updateStock(productId: number, quantity: number): Promise<StockDTO> {
    // Rechercher le produit avec sa catégorie
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,  // Inclure les détails de la catégorie ici aussi
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    // Mettre à jour le stock du produit
    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: { stock: product.stock - quantity },
    });

    // Créer un mouvement de stock
    const updatedStock = await this.prisma.stock.create({
      data: {
        productId: productId,
        movement: 'retrait',
        quantity: quantity,
      },
    });

    // Retourner un objet StockDTO avec les informations complètes du produit et de la catégorie
    return {
      id: updatedStock.id,
      productId: updatedProduct.id,
      quantity: updatedStock.quantity,
      movement: updatedStock.movement,
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description || 'No description',
        price: updatedProduct.price || 0,
        stock: updatedProduct.stock,
        stockAlert: updatedProduct.stockAlert || 0,
        createdAt: updatedProduct.createdAt,
        category: {  // Inclure l'objet `category`
          id: product.category.id,  // Maintenant on utilise `product.category`
          name: product.category.name,  
          createdAt: product.category.createdAt,
        },
      },
    };
  }
}
