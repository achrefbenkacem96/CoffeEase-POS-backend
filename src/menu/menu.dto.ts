import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CategoryDTO } from '../category/category.dto';

@ObjectType()
export class MenuDTO {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [CategoryDTO])
  categories: CategoryDTO[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
