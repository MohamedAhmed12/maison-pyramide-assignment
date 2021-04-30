import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule, } from "@nestjs/graphql";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { from } from "rxjs";

@Module( {
  imports: [
    UsersModule,
    GraphQLModule.forRoot( {
      autoSchemaFile: 'schema.gql',
      debug:true,
      formatError: ( error: GraphQLError ) =>
      {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response || error.message,
        };
        return graphQLFormattedError;
      },
    } ),
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
} )
export class AppModule { }
