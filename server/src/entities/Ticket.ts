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
import { PointOfSell } from "./PointOfSell";
import { TicketProduct } from "./TicketProduct";
import { User } from "./User";

@ObjectType()
@Entity()
export class Ticket extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  date!: string;

  @Field()
  @Column()
  responsibleUserId!: number;

  @Field()
  @Column()
  status!: number;

  @Field()
  @Column({ type: "decimal" })
  startMoney!: number;

  @Field({ nullable: true })
  @Column({ type: "decimal", nullable: true })
  endMoney: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startComment: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endComment: string;

  @Field()
  @Column()
  posId!: number;

  @Field()
  @Column()
  shopId!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.tickets)
  responsibleUser: User;

  @Field()
  @ManyToOne(() => PointOfSell, (pos) => pos.tickets)
  pos: PointOfSell;

  @Field(() => [TicketProduct], { nullable: true })
  @OneToMany(() => TicketProduct, (sp) => sp.product, { nullable: true })
  ticketProducts: TicketProduct[];

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}
