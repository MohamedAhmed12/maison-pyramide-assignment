import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { UserRepository } from "./repositories/user.repository";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from '@nestjs/jwt';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [UserRepository] ),
    JwtModule.register( {
      secret: "secretkey123@#",
      signOptions: {
        expiresIn: 360000,
      },
    } ),],
  providers: [UsersResolver, UsersService, JwtStrategy]
} )
export class UsersModule { }
