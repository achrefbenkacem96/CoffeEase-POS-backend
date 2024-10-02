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
  @Args('categoryId') categoryId: number,
  @Args('imageUrl', { nullable: true }) imageUrl?: string,
): Promise<ProductDTO> {
  return this.productService.addProduct({
    name,
    description,
    price,
    stock,
    categoryId,
    imageUrl, // Utilisation de l'image facultative
  });
}


  @Mutation(() => ProductDTO)
  async updateProduct(
    @Args('productId') productId: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('price', { nullable: true }) price?: number,
    @Args('stock', { nullable: true }) stock?: number,
    @Args('imageUrl', { nullable: true }) imageUrl?: string,
    @Args('categoryId', { nullable: true }) categoryId?: number,
  ) {
    return this.productService.updateProduct(productId, { name, description, price, stock, imageUrl, categoryId });
  }

  @Mutation(() => ProductDTO)
  async deleteProduct(@Args('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Query(() => [ProductDTO])
  async productsByCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number,
  ) {
    return this.productService.getProductsByCategory(categoryId);
  }
}
