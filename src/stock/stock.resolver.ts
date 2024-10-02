import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StockService } from './stock.service';
import { StockDTO } from './stock.dto';

@Resolver(() => StockDTO)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Query(() => [StockDTO])
  async stocks() {
    return this.stockService.getStocks();
  }

  @Mutation(() => StockDTO)
  async addStock(
    @Args('productId', { type: () => Int }) productId: number,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('movement', { type: () => String }) movement: string, // Ajout du troisième argument 'movement'
  ) {
    return this.stockService.addStock(productId, quantity, movement);
  }

  @Mutation(() => StockDTO)
  async updateStock(
    @Args('id', { type: () => Int }) id: number,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.stockService.updateStock(id, quantity);
  }

  @Mutation(() => StockDTO)
  async deleteStock(@Args('id', { type: () => Int }) id: number) {
    return this.stockService.deleteStock(id);
  }
}
