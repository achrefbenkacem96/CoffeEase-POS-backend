import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  async getOrdersByTable(tableId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { tableId },
      include: {
        product: true, // Inclure les produits dans la commande
      },
    });
  }
  constructor(private prisma: PrismaService) {}

  // Créer une commande avec gestion du stock
  async createOrder(productId: number, quantity: number, tableId: number): Promise<Order> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Produit non trouvé");
    }

    if (product.stock < quantity) {
      throw new Error("Stock insuffisant");
    }

    // Créer la commande
    const order = await this.prisma.order.create({
      data: {
        product: { connect: { id: productId } },
        quantity,
        table: { connect: { id: tableId } },
      },
      include: { product: true, table: true },
    });

    // Mettre à jour le stock
    await this.prisma.product.update({
      where: { id: productId },
      data: { stock: product.stock - quantity },
    });

    // Enregistrer un mouvement de stock
    await this.prisma.stock.create({
      data: {
        productId: productId,
        movement: 'retrait',  // ou 'ajout' si c'était un ajout
        quantity: quantity,
      },
    });

    // Alerte de stock
    if (product.stock - quantity <= product.stockAlert) {
      console.warn(`Alerte: Le stock du produit ${product.name} est bas !`);
    }

    return order;
  }

  // Mettre à jour une commande
  async updateOrderStatus(id: number, status: string): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: { product: true, table: true },
    });
  }

  // Supprimer une commande
  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: { id },
    });
  }

  // Obtenir toutes les commandes
  async getOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: { product: true, table: true },
    });
  }

  // Obtenir une commande par son ID
  async getOrderById(id: number): Promise<Order> {
    return this.prisma.order.findUnique({
      where: { id },
      include: { product: true, table: true },
    });
  }

  
}
