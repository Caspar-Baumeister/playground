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
  _id!: number;

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

  @ManyToOne(() => User, (user) => user.shops)
  creator: User;

  @OneToMany(() => Shop, (shop) => shop.creator)
  shops: Shop[];

  @OneToMany(() => EventUser, (eventUser) => eventUser.event)
  eventUsers: EventUser[];

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}
