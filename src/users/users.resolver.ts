import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { UseGuards } from '@nestjs/common';
import { GrahQLAuthGuard } from "./guards/graphQLAuth.guard";
import { CurrentUser } from "./decoratories/currentUser.decorator";

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
  @UseGuards( GrahQLAuthGuard )
  findOne( @CurrentUser() currentUser: User)
  {
    return this.usersService.findOne( currentUser.id );
  }
}
