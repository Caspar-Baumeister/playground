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
import { Shop } from "./Shop";
import { WarehouseProduct } from "./WarehouseProduct";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  usualPrice!: number;

  @Field()
  @Column()
  shopId!: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(
    () => WarehouseProduct,
    (warehouseProduct) => warehouseProduct.product
  )
  warehouseProducts: WarehouseProduct[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
