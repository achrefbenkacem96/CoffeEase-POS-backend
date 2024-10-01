import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';

@Resolver(() => ProductDTO)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [ProductDTO])
  async products() {
    return this.productService.getProducts();
  }

  @Mutation(() => ProductDTO)
  async addProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('stock') stock: number,
    @Args('categoryId') categoryId: number, // Ajouter la catégorie
  ) {
    return this.productService.addProduct(name, description, price, stock, categoryId);
  }

  @Mutation(() => ProductDTO)
async updateProduct(
  @Args('id') id: number,
  @Args('name') name: string,
  @Args('description') description: string,
  @Args('price') price: number,
  @Args('stock') stock: number,
  @Args('categoryId', { type: () => Int, nullable: true }) categoryId?: number, // Optionnel
) {
  return this.productService.updateProduct(id, name, description, price, stock, categoryId);
}

  @Mutation(() => ProductDTO)
  async deleteProduct(@Args('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
