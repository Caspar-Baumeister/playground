
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Admin extends BaseEntity{

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;
  
  @Field(() => String)
  @CreateDateColumn({type: 'date'})
  createdAt?: Date;
  
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
  
  @Field()
  @Column({unique: true})
  email!: string;

  @Column({})
  password!: string;

}