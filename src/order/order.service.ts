import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // Récupérer un produit avec sa catégorie
  async getProductWithCategoryById(productId: number) {
    return this.prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },  // Inclure la catégorie
    });
  }

  async getTableById(tableId: number) {
    return this.prisma.table.findUnique({
      where: { id: tableId },
    });
  }

  async updateOrderQuantity(orderId: number, quantity: number): Promise<Order> {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { quantity },
      include: {
        product: true,  // Inclure les détails du produit
        table: true,    // Inclure les détails de la table
      },
    });
  }

  async createOrder(productId: number, quantity: number, tableId: number): Promise<Order> {
    return this.prisma.order.create({
      data: {
        productId,
        quantity,
        tableId,
      },
      include: {
        product: true,
        table: true,
      },
    });
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        product: true,
        table: true,
      },
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: { id },
      include: {
        product: true,
        table: true,
      },
    });
  }

  async getOrdersByTable(tableId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { tableId },
      include: {
        product: true, // Inclure l'objet complet Product
        table: true,   // Inclure l'objet complet Table
      },
    });
  }

  async getOrderById(id: number): Promise<Order> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        product: true, // Inclure l'objet complet Product
        table: true,   // Inclure l'objet complet Table
      },
    });
  }
}
