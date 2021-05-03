import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsRepository } from "./repositories/product.repository";
import { UserRepository } from "../users/repositories/user.repository";
import { GqlExecutionContext } from "@nestjs/graphql";

@Module( {
  imports: [
    TypeOrmModule.forFeature( [ProductsRepository, UserRepository] ),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    GqlExecutionContext
  ]

} )
export class ProductsModule { }
