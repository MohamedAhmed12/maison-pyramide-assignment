import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from "./repositories/user.repository";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtStrategy } from "./jwt.strategy";

@Module( {
  imports: [
    PassportModule.register( { defaultStrategy: 'jwt' } ),
    TypeOrmModule.forFeature( [UserRepository] ),
    JwtModule.register( {
      secret: "secretkey123@#",
      signOptions: {
        expiresIn: 360000,
      },
    } ),
  ],
  providers: [
    UsersResolver,
    UsersService,
    GqlExecutionContext,
    JwtStrategy
  ],
  exports: [
    JwtModule,
    JwtStrategy 
  ]
} )
export class UsersModule { }
