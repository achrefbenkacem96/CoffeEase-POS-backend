import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  // Créer un paiement pour une commande
  async createPayment(orderId: number, amount: number, paymentType: string) {
    const payment = await this.prisma.payment.create({
      data: {
        amount,
        paymentType,
        order: {
          connect: { id: orderId },  // Vérifie que l'orderId est correct et que la commande existe
        },
      },
      include: {
        order: { include: { product: true } },  // Assure-toi que le produit est bien inclus
      },
    });
  
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
