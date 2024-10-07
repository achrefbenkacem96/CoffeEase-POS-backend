import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductDTO } from '../product/product.dto';  // Assurez-vous d'avoir défini ProductDTO
import { TableDTO } from '../table/table.dto';        // Assurez-vous d'avoir défini TableDTO

@ObjectType()
export class OrderDTO {
  @Field(() => Int)
  id: number;

  @Field()
  status: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => ProductDTO)  // Assurez-vous que ProductDTO est bien défini
  product: ProductDTO;

  @Field(() => TableDTO)     // Assurez-vous que TableDTO est bien défini
  table: TableDTO;

  @Field(() => Date)
  createdAt: Date;
}
