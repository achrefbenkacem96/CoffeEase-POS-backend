import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderDTO } from 'src/order/order.dto';
@ObjectType()
export class TableDTO {
  @Field(() => Int)
  id: number;

  @Field()
  number: number;

  @Field()
  status: string;

  @Field()
  createdAt: Date;
}
