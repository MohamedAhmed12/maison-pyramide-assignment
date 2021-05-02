import { InputType, Field, Int } from "@nestjs/graphql";
import { MaxLength, Length, IsEmail, MinLength } from "class-validator";
import { pathToFileURL } from "url";

@InputType()
export class AuthCredentialsInput
{
  @Field( { nullable: true } )
  readonly name?: string;

  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @MinLength( 6 )
  @MaxLength( 20 )
  password: string;

  @Field( { nullable: true } )
  readonly password_confirmation?: string;
}
