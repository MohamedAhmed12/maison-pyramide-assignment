import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity( "users" )
export class User
{
  @Field( type => ID, { nullable: true } )
  @PrimaryGeneratedColumn( 'increment' )
  id?: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
  created_at: Date;

  @Field()
  @Column( { type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true } )
  updated_at: Date;

  @Field()
  token: string;
}
