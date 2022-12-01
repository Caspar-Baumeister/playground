import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";
import { User } from "./User";
import { Warehouse } from "./Warehouse";

@ObjectType()
@Entity()
export class Shop extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  creatorId!: number;

  @ManyToOne(() => User, (user) => user.shops)
  creator: User;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];

  @OneToMany(() => Category, (category) => category.shop)
  categories: Category[];

  @OneToMany(() => Warehouse, (warehouse) => warehouse.shop)
  warehouses: Warehouse[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
