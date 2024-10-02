import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StockDTO } from './stock.dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  // Récupérer tous les produits en stock
  async getStocks(): Promise<StockDTO[]> {
    return this.prisma.stock.findMany({
      include: {
        product: {
          include: {
            category: true, // Inclure les détails de la catégorie du produit
          },
        },
      },
    });
  }

  // Ajouter un produit au stock
  async addStock(productId: number, quantity: number, movement: string): Promise<StockDTO> {
    return this.prisma.stock.create({
      data: {
        product: {
          connect: { id: productId }, // Utilisation de connect pour lier un produit existant
        },
        quantity,
        movement, // Ajout du mouvement dans la création
      },
      include: {
        product: {
          include: {
            category: true, // Inclure les détails de la catégorie du produit
          },
        },
      },
    });
  }

  // Modifier la quantité d'un produit en stock
  async updateStock(id: number, quantity: number): Promise<StockDTO> {
    return this.prisma.stock.update({
      where: { id },
      data: { quantity },
      include: {
        product: {
          include: {
            category: true, // Inclure les détails de la catégorie du produit
          },
        },
      },
    });
  }

  // Supprimer un produit du stock
  async deleteStock(id: number): Promise<StockDTO> {
    return this.prisma.stock.delete({
      where: { id },
      include: {
        product: {
          include: {
            category: true, // Inclure les détails de la catégorie du produit
          },
        },
      },
    });
  }
}
