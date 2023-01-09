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
import { Ticket } from "./Ticket";
import { Product } from "./Product";
import { ShopUser } from "./ShopUser";
import { Tag } from "./Tag";
import { User } from "./User";

@ObjectType()
@Entity()
export class Shop extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.createdShops, { onDelete: "SET NULL" })
  creator: User;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];

  @Field(() => [Tag], { nullable: true })
  @OneToMany(() => Tag, (tag) => tag.shop)
  tags: Tag[];

  @Field(() => [Ticket], { nullable: true })
  @OneToMany(() => Ticket, (ticket) => ticket.shopId)
  tickets: Ticket[];

  @Field(() => [ShopUser], { nullable: true })
  @OneToMany(() => ShopUser, (shopUser) => shopUser.shop)
  users: ShopUser[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
