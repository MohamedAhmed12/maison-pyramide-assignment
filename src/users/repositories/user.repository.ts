import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AuthCredentialsInput } from "../dto/auth-credentials.input";
import { PartialType } from "@nestjs/graphql";

@EntityRepository( User )
export class UserRepository extends Repository<User> {
  async register( AuthCredentialsInput: AuthCredentialsInput ): Promise<User>
  {
    const { name, email, password } = AuthCredentialsInput;
    let user = this.create( AuthCredentialsInput );
    return this.save( user );
  }
}
