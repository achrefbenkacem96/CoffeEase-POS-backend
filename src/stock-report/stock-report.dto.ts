import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductDTO } from 'src/product/product.dto'; // Assurez-vous d'importer correctement le DTO du produit

@ObjectType()
export class StockReportDTO {
  @Field(() => Int)
  id: number;

  @Field(() => ProductDTO, { nullable: true }) // Utilisez nullable: true si le produit peut être null
  product?: ProductDTO; // Le rendre facultatif ou nullable

  @Field(() => Int)
  stockBefore: number;

  @Field(() => Int)
  stockAfter: number;

  @Field(() => String)
  movement: string;

  @Field(() => Date)
  createdAt: Date;
}
