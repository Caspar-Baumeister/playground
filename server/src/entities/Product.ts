import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;
  
  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date 
  
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
  
  @Field()
  @Column()
  title!: string;

}