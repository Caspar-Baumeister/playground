import { Field, ID, ObjectType } from "type-graphql";
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
import { Shop } from "./Shop";

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

  @Field()
  @Column()
  role!: number;

  @Field(() => ID)
  @Column()
  shopId!: number;

  @Field(() => Shop)
  @ManyToOne(() => Shop, (shop) => shop.users)
  shop: Shop;

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt?: Date;

  @Field(() => [Ticket])
  @OneToMany(() => Ticket, (ticket) => ticket.responsibleUser)
  tickets: Ticket[];

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}
