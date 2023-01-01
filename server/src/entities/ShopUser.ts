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
import { Shop } from "./Shop";
import { User } from "./User";

// this is a jointable
// it tracks the product inventory of the Tags
// Products -> ShopUser <- Tag

@ObjectType()
@Entity()
export class ShopUser extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.shopUsers)
  user: User;

  @Field()
  @PrimaryColumn()
  shopId!: number;

  @Field(() => Shop)
  @ManyToOne(() => Shop, (shop) => shop.users)
  shop: Shop;

  @Field()
  @Column()
  role!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
