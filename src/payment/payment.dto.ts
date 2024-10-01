import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { OrderDTO } from '../order/order.dto';

@ObjectType()
export class PaymentDTO {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  status: string;

  @Field(() => String)
  paymentType: string;

  @Field(() => OrderDTO, { nullable: true })  // Rend le champ nullable
  order?: OrderDTO;  // Ajoute le "?" pour indiquer que le champ peut être null
}
