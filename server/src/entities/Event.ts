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
import { EventUser } from "./EventUser";
import { Shop } from "./Shop";
import { User } from "./User";

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column()
  startTime!: string;

  @Field()
  @Column()
  endTime!: string;

  @Field()
  @Column()
  creatorId!: string;

  @ManyToOne(() => User, (user) => user.eventUsers)
  creator: User;

  @ManyToOne(() => Shop, (shop) => shop.events)
  shop: Shop;

  @OneToMany(() => EventUser, (eventUser) => eventUser.event)
  eventUsers: EventUser[];

  //EVENT_PRODUCTS

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}
