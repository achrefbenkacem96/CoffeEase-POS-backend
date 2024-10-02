import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductDTO } from '../product/product.dto'; 

@ObjectType()
export class StockDTO {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  productId: number;

  @Field(() => ProductDTO, { nullable: true })  // Ajouter le champ product ici
  product?: ProductDTO;

  @Field()
  movement: string;  // Ajout du champ movement

  @Field(() => Int)
  quantity: number;

  @Field(() => Date)
  createdAt: Date;
}
