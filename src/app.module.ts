import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule, } from "@nestjs/graphql";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { JwtStrategy } from "./users/jwt.strategy";

@Module( {
  imports: [
    UsersModule,
    GraphQLModule.forRoot( {
      autoSchemaFile: 'schema.gql',
      formatError: ( error: GraphQLError ) =>
      {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response || error.message,
        };
        return graphQLFormattedError;
      },
      context: ( { req } ) => ( { req } ),
      debug: true,
    } ),
    TypeOrmModule.forRoot(),
    JwtModule.register( {
      secret: "secretkey123@#",
      signOptions: {
        expiresIn: 360000,
      },
    } ),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
    AppService
  ],
} )
export class AppModule { }
