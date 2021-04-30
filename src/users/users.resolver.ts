import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver( () => User )
export class UsersResolver
{
  constructor ( private readonly usersService: UsersService ) { }

  @Mutation( () => User )
  async register( @Args( 'AuthCredentialsInput' ) AuthCredentialsInput: AuthCredentialsInput )
  {
   return await this.usersService.register( AuthCredentialsInput );
  }

  @Query( () => [User], { name: 'users', nullable: true } )
  findAll()
  {
    return this.usersService.findAll();
  }

  @Query( () => User, { name: 'user' } )
  findOne( @Args( 'id', { type: () => Int } ) id: number )
  {
    return this.usersService.findOne( id );
  }

  @Mutation( () => User )
  updateUser( @Args( 'updateUserInput' ) updateUserInput: UpdateUserInput )
  {
    return this.usersService.update( updateUserInput.id, updateUserInput );
  }

  @Mutation( () => User )
  removeUser( @Args( 'id', { type: () => Int } ) id: number )
  {
    return this.usersService.remove( id );
  }
}
