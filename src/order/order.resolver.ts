import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderDTO } from './order.dto';
import { StockDTO } from '../stock/stock.dto';

@Resolver(() => OrderDTO)
export class OrderResolver {
  prisma: any;
  constructor(private orderService: OrderService) {}

  // Requête pour obtenir toutes les commandes
  @Query(() => [OrderDTO])
  async orders(
    @Args('tableId', { type: () => Int }) tableId: number,
  ) {
    return this.orderService.getOrdersByTable(tableId);
  }

  // Requête pour obtenir une commande par son ID
  @Query(() => OrderDTO)
  async getOrderById(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.getOrderById(id);
  }

  // Mutation pour créer une commande
  @Mutation(() => OrderDTO)
  async createOrder(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
    @Args('tableId') tableId: number, // Ajouter tableId
  ) {
    return this.orderService.createOrder(productId, quantity, tableId);
  }

  // Mutation pour mettre à jour le statut d'une commande
  @Mutation(() => OrderDTO)
  async updateOrderStatus(
    @Args('id') id: number,
    @Args('status') status: string,
  ) {
    return this.orderService.updateOrderStatus(id, status);
  }

  // Mutation pour supprimer une commande
  @Mutation(() => OrderDTO)
  async deleteOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.deleteOrder(id);
  }

  @Query(() => [StockDTO])
  async stockMovements(@Args('productId') productId: number) {
    return this.prisma.stock.findMany({
      where: { productId },
    });
  }

}
