import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@ObjectType()
@Entity( "products" )
export class Product
{
  @Field( type => ID, { nullable: true } )
  @PrimaryGeneratedColumn( 'increment' )
  id: number;

  @Field()
  @Column()
  name: string;

  @Field( type => Int )
  @Column()
  price: number;

  @Field( () => User )
  @ManyToOne( () => User, seller => seller.products )
  @JoinColumn( { name: "user_id" } )
  seller: User;

  @Column()
  public user_id: number
}
