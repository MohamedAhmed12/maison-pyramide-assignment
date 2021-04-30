import { InputType, Field, Int } from "@nestjs/graphql";
import { MaxLength, Length, IsEmail, MinLength } from "class-validator";

@InputType()
export class AuthCredentialsInput
{
  @Field()
  readonly name?: string;

  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @MinLength(6)
  @MaxLength(20)
  readonly password: string;

}
