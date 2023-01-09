import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ticket } from "./Ticket";
import { Shop } from "./Shop";
import { ShopUser } from "./ShopUser";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  name!: string;

  @Column({})
  password!: string;

  @Field(() => [Shop], { nullable: true })
  @OneToMany(() => Shop, (shop) => shop.creator)
  createdShops: Shop[];

  @Field(() => [ShopUser], { nullable: true })
  @OneToMany(() => ShopUser, (shopUser) => shopUser.user)
  shopUsers: ShopUser[];

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt?: Date;

  @Field(() => [Ticket], { nullable: true })
  @OneToMany(() => Ticket, (ticket) => ticket.responsibleUser)
  tickets: Ticket[];

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}
