import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsInput } from "./dto/auth-credentials.input";
import { UpdateUserInput } from './dto/update-user.input';
import { User } from "./entities/user.entity";
import { UserRepository } from "./repositories/user.repository";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService
{
  constructor (
    @InjectRepository( UserRepository )
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async register( AuthCredentialsInput: AuthCredentialsInput )
  {
    return await this.userRepository.register( AuthCredentialsInput );
  }

  async login( AuthCredentialsInput: AuthCredentialsInput )
  {
    let user = await this.userRepository.login( AuthCredentialsInput );
    const payload = { username: user.name, sub: user.id };
    
    return { token: this.jwtService.sign( payload ), ...user };
  }

  findOne( id: number )
  {
    return `This action returns a #${ id } user`;
  }

  update( id: number, updateUserInput: UpdateUserInput )
  {
    return `This action updates a #${ id } user`;
  }

  remove( id: number )
  {
    return `This action removes a #${ id } user`;
  }
}
