import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @ManyToOne(() => User, (user) => user.shopUsers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Field()
  @PrimaryColumn()
  shopId!: number;

  @Field(() => Shop)
  @ManyToOne(() => Shop, (shop) => shop.users, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "shopId" })
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
