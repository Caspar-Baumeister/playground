
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class User extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;
  
  @Field()
  @Column({unique: true})
  email!: string;

  @Column({})
  password!: string;

  @OneToMany(() => Product, (product) => product.creator)
  products: Product[]

  @Field(() => String)
  @CreateDateColumn({type: 'date'})
  createdAt?: Date;
   
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}