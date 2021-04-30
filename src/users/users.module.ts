import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { UserRepository } from "./repositories/user.repository";

@Module( {
  imports: [TypeOrmModule.forFeature( [UserRepository] )],
  providers: [UsersResolver, UsersService]
} )
export class UsersModule { }
