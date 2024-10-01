import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { MenuDTO } from './menu.dto';

@Resolver(() => MenuDTO)
export class MenuResolver {
  constructor(private menuService: MenuService) {}

  @Mutation(() => MenuDTO)
  async createMenu(
    @Args('name') name: string,
    @Args({ name: 'categoryIds', type: () => [Int] }) categoryIds: number[],
  ) {
    return this.menuService.createMenu(name, categoryIds);
  }

  @Query(() => [MenuDTO])
  async menus() {
    return this.menuService.getMenus();
  }

  @Mutation(() => MenuDTO)
  async updateMenu(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args({ name: 'categoryIds', type: () => [Int] }) categoryIds: number[],
  ) {
    return this.menuService.updateMenu(id, name, categoryIds);
  }

  @Mutation(() => MenuDTO)
  async deleteMenu(@Args('id') id: number) {
    return this.menuService.deleteMenu(id);
  }
}
