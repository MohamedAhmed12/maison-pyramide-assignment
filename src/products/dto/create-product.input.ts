import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  readonly name?: string

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  readonly price: number

  @Field()
  @IsInt()
  @IsPositive()
  user_id: number
}
