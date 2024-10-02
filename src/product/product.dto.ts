import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Category } from '@prisma/client';
import { CategoryDTO } from 'src/category/category.dto';

@ObjectType()
export class ProductDTO {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field(() => Int)
  stockAlert: number;  // Ajoute le champ stockAlert

  @Field(() => String, { nullable: true })
  imageUrl?: string;  // Ajout du champ imageUrl

  @Field(() => Date)
  createdAt: Date;

  @Field(() => CategoryDTO)
  category: Category;
}
