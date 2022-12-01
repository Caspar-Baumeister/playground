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
import { Shop } from "./Shop";
import { WarehouseProduct } from "./WarehouseProduct";

@ObjectType()
@Entity()
export class Warehouse extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column(() => String)
  location!: string;

  @Field()
  @Column()
  shopId!: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @OneToMany(
    () => WarehouseProduct,
    (warehouseProduct) => warehouseProduct.warehouse
  )
  warehouseProducts: WarehouseProduct[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
