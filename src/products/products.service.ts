import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { ProductsRepository } from "./repositories/product.repository";
import { UserRepository } from "../users/repositories/user.repository";

@Injectable()
export class ProductsService
{
  constructor (
    @InjectRepository( ProductsRepository ) private readonly productsRepository: ProductsRepository,
    @InjectRepository( UserRepository ) private readonly userRepository: UserRepository
  ) { }

  async create( createProductInput: CreateProductInput )
  {
    return this.productsRepository.createProduct(createProductInput);
  }

  findAll()
  {
    return this.productsRepository.find();
  }

  async findMine( currentUser )
  {
    const user = await this.userRepository.findOne(
      currentUser.id,
      {
        relations: ["products"],
      } );
    return user.products;
  }
}
