import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TableService } from './table.service';
import { TableDTO } from './table.dto';

@Resolver(() => TableDTO)
export class TableResolver {
  constructor(private tableService: TableService) {}

  // Requête pour obtenir toutes les tables
  @Query(() => [TableDTO])
  async tables() {
    return this.tableService.getTables();
  }

  // Mutation pour créer une table avec un statut
@Mutation(() => TableDTO)
async createTable(
  @Args('number') number: number,
  @Args('status', { defaultValue: 'AVAILABLE' }) status: string,
) {
  return this.tableService.createTable(number, status);
}


  // Mutation pour mettre à jour le statut d'une table
  @Mutation(() => TableDTO)
  async updateTableStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status') status: string,
  ) {
    return this.tableService.updateTableStatus(id, status);
  }
  

  // Mutation pour supprimer une table
  @Mutation(() => TableDTO)
  async deleteTable(@Args('id', { type: () => Int }) id: number) {
    return this.tableService.deleteTable(id);
  }
}
