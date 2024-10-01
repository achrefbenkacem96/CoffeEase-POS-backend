import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';

@Resolver(() => CategoryDTO)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryDTO])
  async categories() {
    return this.categoryService.getCategories();
  }

  @Mutation(() => CategoryDTO)
  async createCategory(@Args('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @Mutation(() => CategoryDTO)
  async updateCategory(@Args('id', { type: () => Int }) id: number, @Args('name') name: string) {
    return this.categoryService.updateCategory(id, name);
  }

  @Mutation(() => CategoryDTO)
  async deleteCategory(@Args('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }

}
