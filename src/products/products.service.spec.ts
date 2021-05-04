import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../users/repositories/user.repository";
import { ProductsRepository } from "./repositories/product.repository";
import { GqlExecutionContext } from "@nestjs/graphql";


const mockUserRepository = () => ( {

} );

const mockProductsRepository = () => ( {

} );

describe( 'ProductsService', () =>
{
  let service: ProductsService;

  beforeEach( async () =>
  {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [
        ProductsService,
        {
          provide: UserRepository, useFactory: mockUserRepository
        },
        {
          provide: ProductsRepository, useFactory: mockProductsRepository
        },
      ],
    } ).compile();

    service = module.get<ProductsService>( ProductsService );
  } );

  it( 'should be defined', () =>
  {
    expect( service ).toBeDefined();
  } );
} );
