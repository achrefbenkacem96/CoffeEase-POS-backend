import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { PaymentDTO } from './payment.dto';

@Resolver(() => PaymentDTO)
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  // Créer un paiement pour une commande
  @Mutation(() => PaymentDTO)
  async createPayment(
    @Args('orderId') orderId: number,
    @Args('amount') amount: number,
    @Args('paymentType') paymentType: string,
  ) {
    return this.paymentService.createPayment(orderId, amount, paymentType);
  }

  // Récupérer tous les paiements
  @Query(() => [PaymentDTO])
  async getPayments() {
    return this.paymentService.getPayments();
  }

  // Mettre à jour le statut d'un paiement
  @Mutation(() => PaymentDTO)
  async updatePaymentStatus(
    @Args('id') id: number,
    @Args('status') status: string,
  ) {
    return this.paymentService.updatePaymentStatus(id, status);
  }
}
