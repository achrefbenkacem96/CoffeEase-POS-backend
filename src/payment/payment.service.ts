import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  // Créer un paiement pour une commande
  async createPayment(orderId: number, amount: number, paymentType: string) {
    // Vérifier si un paiement existe déjà pour cette commande
    const existingPayment = await this.prisma.payment.findUnique({
      where: { orderId },
    });
  
    if (existingPayment) {
      throw new Error('Payment already exists for this order');
    }
  
    // Créer un nouveau paiement
    const payment = await this.prisma.payment.create({
      data: {
        amount,
        paymentType,
        order: {
          connect: { id: orderId },
        },
      },
      include: {
        order: true,
      },
    });
  
    // Clôturer la commande
    await this.prisma.order.updateMany({
      where: { tableId: orderId },
      data: { status: 'COMPLETED' }, // Mettre à jour le statut de la commande à "COMPLETED"
    });
  
    // Rendre la table disponible si elle est associée à une commande clôturée
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { table: true },  // Inclure la table associée
    });
  
    if (order && order.table) {
      await this.prisma.table.update({
        where: { id: order.table.id },
        data: { status: 'AVAILABLE' },  // Mettre à jour le statut de la table à "AVAILABLE"
      });
    }
  
    return payment;
  }
  
  
  
  
  


  // Récupérer tous les paiements
  async getPayments() {
    return this.prisma.payment.findMany({
      include: {
        order: true, // Inclure les détails de la commande dans la réponse
      },
    });
  }

  // Récupérer un paiement spécifique
  async getPaymentById(id: number): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: { id },
      include: { order: true }, // Inclure les informations sur la commande
    });
  }

  // Mettre à jour le statut d'un paiement (PENDING, COMPLETED, FAILED)
  async updatePaymentStatus(id: number, status: string) {
    return this.prisma.payment.update({
      where: { id },
      data: { status },
      include: {
        order: true, // Inclure les détails de la commande dans la réponse
      },
    });
  }
}
