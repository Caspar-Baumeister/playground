import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Product extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;
  
  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  creatorId!: number;

  @ManyToOne(() => User, (user) => user.products)
  creator: User

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date 
  
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
  
}