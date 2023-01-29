import { Field, Float, ObjectType } from "type-graphql";
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
import { Product } from "./Product";
import { Ticket } from "./Ticket";

// this is a jointable
// it tracks the product inventory of the Tickets
// Products -> TicketProduct <- Tickets

@ObjectType()
@Entity()
export class TicketProduct extends BaseEntity {
  @Field()
  @PrimaryColumn()
  ticketId: number;

  @Field()
  @PrimaryColumn()
  productId: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.ticketProducts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Field(() => Ticket)
  @ManyToOne(() => Ticket, (ticket) => ticket.ticketProducts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ticketId" })
  ticket: Ticket;

  @Field(() => Float)
  @Column({ type: "decimal" })
  startAmount!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endAmount: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
