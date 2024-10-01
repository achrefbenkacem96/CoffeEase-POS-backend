import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StockService } from './stock.service';
import { StockDTO } from './stock.dto';

@Resolver(() => StockDTO)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  // Requête pour obtenir tous les stocks
  @Query(() => [StockDTO])
  async stocks() {
    return this.stockService.getStocks();
  }

  // Mutation pour mettre à jour un stock
  @Mutation(() => StockDTO)
  async updateStock(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
  ) {
    return this.stockService.updateStock(productId, quantity);
  }
}
