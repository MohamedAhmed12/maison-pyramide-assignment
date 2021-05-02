import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthCredentialsInput } from './dto/auth-credentials.input';

@Resolver( () => User )
export class UsersResolver
{
  constructor ( private readonly usersService: UsersService ) { }

  @Mutation( () => User )
  async register( @Args( 'AuthCredentialsInput' ) AuthCredentialsInput: AuthCredentialsInput )
  {
   return await this.usersService.register( AuthCredentialsInput );
  }

  @Mutation( () => User )
  login( @Args( 'AuthCredentialsInput' ) AuthCredentialsInput: AuthCredentialsInput )
  {
    return this.usersService.login( AuthCredentialsInput );
  }

  @Query( () => User, { name: 'user' } )
  findOne( @Args( 'id', { type: () => Int } ) id: number )
  {
    return this.usersService.findOne( id );
  }
}
