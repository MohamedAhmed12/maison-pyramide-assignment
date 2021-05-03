import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AuthCredentialsInput } from "../dto/auth-credentials.input";
import { compareSync, genSalt, hash } from "bcryptjs";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
@EntityRepository( User )
export class UserRepository extends Repository<User> {
  async register( authCredentialsInput: AuthCredentialsInput ): Promise<User>
  {
    const { name, email, password, password_confirmation } = authCredentialsInput;
    if ( password !== password_confirmation )
    {
      throw new NotFoundException( "Password and password_confirmation should match" );
    }

    const emailCheck = await this.count( { email } );

    if ( emailCheck )
    {
      throw new NotFoundException(
        "email exists, please pick up another one."
      );
    }

    authCredentialsInput.password = await this.hash( authCredentialsInput.password );

    let user = this.create( authCredentialsInput );

    return this.save( user );
  }

  async login( AuthCredentialsInput: AuthCredentialsInput ): Promise<User>
  {
    const { email, password } = AuthCredentialsInput;
    const user = await this.findOneOrFail( { email } );

    if ( !compareSync( password, user.password ) )
    {
      throw new UnauthorizedException( "Invalid credentials" );
    }

    return user;
  }

  private async hash( password: string ): Promise<any>
  {
    return hash( password, await genSalt() );
  }
}
