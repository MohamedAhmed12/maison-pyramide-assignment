import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductsRepository } from "./repositories/product.repository";
import { UserRepository } from "../users/repositories/user.repository";


const mockUserRepository = () => ( {

} );

const mockProductsRepository = () => ( {

} );

describe( 'ProductsResolver', () =>
{
  let resolver: ProductsResolver;

  beforeEach( async () =>
  {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [
        ProductsResolver,
        ProductsService,
        {
          provide: ProductsRepository, useFactory: mockProductsRepository
        },
        {
          provide: UserRepository, useFactory: mockUserRepository
        }
      ],
    } ).compile();

    resolver = module.get<ProductsResolver>( ProductsResolver );
  } );

  it( 'should be defined', () =>
  {
    expect( resolver ).toBeDefined();
  } );
} );
