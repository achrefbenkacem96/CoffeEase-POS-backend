import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class FinancialReportDTO {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  totalRevenue: number;

  @Field(() => Float)
  totalExpenses: number;

  @Field(() => Float)
  profitOrLoss: number;

  @Field(() => Date)
  createdAt: Date;
}
