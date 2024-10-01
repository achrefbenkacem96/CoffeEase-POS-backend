import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductDTO } from 'src/product/product.dto';
import { TableDTO } from 'src/table/table.dto'; // Assurez-vous d'importer TableDTO

@ObjectType()
export class OrderDTO {
  @Field(() => Int)
  id: number;

  @Field()
  status: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => ProductDTO)
  product: ProductDTO;

  @Field(() => TableDTO) // Ajouter la table ici
  table: TableDTO;

  @Field(() => Date)
  createdAt: Date;
}
