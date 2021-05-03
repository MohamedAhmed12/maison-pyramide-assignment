import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UseGuards } from '@nestjs/common';
import { GrahQLAuthGuard } from "../users/guards/graphQLAuth.guard";
import { CurrentUser } from '../users/decoratories/currentUser.decorator';
import { User } from '../users/entities/user.entity';
@Resolver( () => Product )
export class ProductsResolver
{
  constructor (
    private readonly productsService: ProductsService,
  ) { }

  @Mutation( () => Product )
  createProduct( @Args( 'CreateProductInput' ) createProductInput: CreateProductInput )
  {
    return this.productsService.create( createProductInput );
  }

  @Query( () => [Product], { name: 'products' } )
  @UseGuards( GrahQLAuthGuard )
  findAll()
  {
    return this.productsService.findAll();
  }

  @Query( () => [Product], { name: 'myProducts' } )
  @UseGuards( GrahQLAuthGuard )
  async findMine( @CurrentUser() currentUser: User )
  {
    return this.productsService.findMine(currentUser);
  }
}
