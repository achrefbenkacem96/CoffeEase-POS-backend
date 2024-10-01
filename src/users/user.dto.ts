import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;
}
