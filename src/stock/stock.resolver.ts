import { Resolver, Query } from '@nestjs/graphql';
import { StockService } from './stock.service';
import { StockDTO } from './stock.dto';

@Resolver(() => StockDTO)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Query(() => [StockDTO])
  async stocks() {
    return this.stockService.getStocks();
  }
}
