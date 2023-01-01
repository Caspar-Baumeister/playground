import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Shop } from "./Shop";

@ObjectType()
@Entity()
export class PointOfSell extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  location!: string;

  @Field()
  @Column()
  usualStartDate!: string;

  @Field()
  @Column()
  usualEndDate!: string;

  @Field()
  @Column()
  shopId!: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
