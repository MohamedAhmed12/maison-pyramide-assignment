import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { CreateProductInput } from "../dto/create-product.input";

@EntityRepository( Product )
export class ProductsRepository extends Repository<Product> {
    async createProduct( createProductInput: CreateProductInput ): Promise<Product>
    {
        let user = this.create( createProductInput );
        return this.save( user );
    }
}