import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderDTO } from './order.dto';

@Resolver(() => OrderDTO)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => OrderDTO)
  async updateOrderQuantity(
    @Args('orderId', { type: () => Int }) orderId: number,
    @Args('quantity', { type: () => Int }) quantity: number,
  ): Promise<OrderDTO> {
    const updatedOrder = await this.orderService.updateOrderQuantity(orderId, quantity);

    // Récupérer le produit et la table liés
    const product = await this.orderService.getProductWithCategoryById(updatedOrder.productId);
    const table = await this.orderService.getTableById(updatedOrder.tableId);

    return {
      id: updatedOrder.id,
      status: updatedOrder.status,
      quantity: updatedOrder.quantity,
      product,
      table,
      createdAt: updatedOrder.createdAt,
    };
  }

  @Mutation(() => OrderDTO)
  async createOrder(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
    @Args('tableId') tableId: number,
  ): Promise<OrderDTO> {
    const order = await this.orderService.createOrder(productId, quantity, tableId);
    const product = await this.orderService.getProductWithCategoryById(order.productId);
    const table = await this.orderService.getTableById(order.tableId);

    return {
      id: order.id,
      status: order.status,
      quantity: order.quantity,
      product,
      table,
      createdAt: order.createdAt,
    };
  }

  @Mutation(() => OrderDTO)
  async updateOrderStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status') status: string,
  ): Promise<OrderDTO> {
    const updatedOrder = await this.orderService.updateOrderStatus(id, status);
    const product = await this.orderService.getProductWithCategoryById(updatedOrder.productId);
    const table = await this.orderService.getTableById(updatedOrder.tableId);

    return {
      id: updatedOrder.id,
      status: updatedOrder.status,
      quantity: updatedOrder.quantity,
      product,
      table,
      createdAt: updatedOrder.createdAt,
    };
  }

  @Mutation(() => OrderDTO)
  async deleteOrder(@Args('id', { type: () => Int }) id: number): Promise<OrderDTO> {
    const deletedOrder = await this.orderService.deleteOrder(id);
    const product = await this.orderService.getProductWithCategoryById(deletedOrder.productId);
    const table = await this.orderService.getTableById(deletedOrder.tableId);

    return {
      id: deletedOrder.id,
      status: deletedOrder.status,
      quantity: deletedOrder.quantity,
      product,
      table,
      createdAt: deletedOrder.createdAt,
    };
  }

  @Query(() => [OrderDTO])
  async orders(
    @Args('tableId', { type: () => Int }) tableId: number,
    @Args('status', { nullable: true }) status?: string // Mark status as optional
  ): Promise<OrderDTO[]> {
    // Fetch orders with or without status depending on whether it's provided
    const orders = await this.orderService.getOrdersByTable(tableId, status);
  
    return Promise.all(
      orders.map(async (order) => {
        const product = await this.orderService.getProductWithCategoryById(order.productId);
        const table = await this.orderService.getTableById(order.tableId);
  
        return {
          id: order.id,
          status: order.status,
          quantity: order.quantity,
          product,
          table,
          createdAt: order.createdAt,
        };
      })
    );
  }
  

  @Query(() => OrderDTO)
  async getOrderById(@Args('id', { type: () => Int }) id: number): Promise<OrderDTO> {
    const order = await this.orderService.getOrderById(id);
    const product = await this.orderService.getProductWithCategoryById(order.productId);
    const table = await this.orderService.getTableById(order.tableId);

    return {
      id: order.id,
      status: order.status,
      quantity: order.quantity,
      product,
      table,
      createdAt: order.createdAt,
    };
  }
}
