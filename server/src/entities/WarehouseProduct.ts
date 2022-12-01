import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { Warehouse } from "./Warehouse";

// this is a jointable
// it tracks the product inventory of the warehouses
// Products -> WarehouseProduct <- Warehouse

@ObjectType()
@Entity()
export class WarehouseProduct extends BaseEntity {
  @Field()
  @PrimaryColumn()
  WarehouseId!: number;

  @Field(() => Warehouse)
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.warehouseProducts)
  warehouse: Warehouse;

  @Field()
  @PrimaryColumn()
  ProductId!: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.warehouseProducts)
  product: Product;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column(() => String)
  location!: string;

  @Field()
  @Column()
  shopId!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
