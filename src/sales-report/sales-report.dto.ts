import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class SalesReportDTO {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  quantitySold: number;

  @Field(() => Float)
  totalRevenue: number;

  @Field(() => Date)
  createdAt: Date;
}
