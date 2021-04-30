import { AuthCredentialsInput } from './auth-credentials.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType( AuthCredentialsInput ) {
  @Field( () => Int )
  readonly id: number;
  @Field()
  @MinLength( 8 )
  readonly password: string;
}
