import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Shop } from "./Shop";
import { TicketProduct } from "./TicketProduct";
import { Tag } from "./Tag";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ type: "decimal" })
  price!: number;

  @Field()
  @Column({ type: "decimal" })
  amount!: number;

  @Field()
  @Column()
  amountType!: number;

  @Field()
  @Column()
  shopId!: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @Field(() => [TicketProduct], { nullable: true })
  @OneToMany(() => TicketProduct, (sp) => sp.product)
  ticketProducts: TicketProduct[];

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable()
  tags: Tag[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
