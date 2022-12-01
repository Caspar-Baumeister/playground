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
import { EventUser } from "./EventUser";
import { Shop } from "./Shop";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  name!: string;

  @Column({})
  password!: string;

  @OneToMany(() => Shop, (shop) => shop.creator)
  shops: Shop[];

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt?: Date;

  @OneToMany(() => EventUser, (eventUser) => eventUser.user)
  eventUsers: EventUser[];

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}
