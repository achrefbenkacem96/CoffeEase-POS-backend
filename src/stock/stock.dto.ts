import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductDTO } from '../product/product.dto';  // Assurez-vous d'importer ProductDTO

@ObjectType()
export class StockDTO {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  productId: number;

  @Field(() => ProductDTO, { nullable: true })  // Ajouter le champ product ici
  product?: ProductDTO;

  @Field()
  movement: string;

  @Field(() => Int)
  quantity: number;
}
