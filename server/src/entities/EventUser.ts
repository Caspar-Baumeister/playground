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
import { Event } from "./Event";
import { User } from "./User";

// this is a join-table
// it tracks the staff of events
// User -> EventUser <- Event

// all user will see their events in their dashboards in the mobile app
// all events will have a list of all users that are currently

@ObjectType()
@Entity()
export class EventUser extends BaseEntity {
  @Field()
  @PrimaryColumn()
  UserId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.eventUsers)
  user: User;

  @Field()
  @PrimaryColumn()
  EventId!: number;

  @Field(() => Event)
  @ManyToOne(() => Event, (event) => event.eventUsers)
  event: Event;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column(() => String)
  location!: string;

  @Field()
  @Column(() => Boolean)
  canEdit!: boolean;

  @Field()
  @Column()
  shopId!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
