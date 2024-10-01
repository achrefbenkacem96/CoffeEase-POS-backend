import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductDTO } from 'src/product/product.dto';

@ObjectType()
export class CategoryDTO {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [ProductDTO], { nullable: true })  // Permet de renvoyer un tableau de ProductDTO
  products?: ProductDTO[];
}
