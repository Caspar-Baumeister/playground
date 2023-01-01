// import { Field, ObjectType } from "type-graphql";
// import {
//   BaseEntity,
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from "typeorm";
// import { Product } from "./Product";
// import { Shop } from "./Shop";

// @ObjectType()
// @Entity()
// export class Category extends BaseEntity {
//   @Field()
//   @PrimaryGeneratedColumn()
//   _id!: number;

//   @Field()
//   @Column()
//   name!: string;

//   @Field()
//   @Column(() => String)
//   imageUrl: string;

//   @Field()
//   @Column()
//   shopId!: number;

//   @ManyToOne(() => Shop, (shop) => shop.products)
//   shop: Shop;

//   @OneToMany(() => Product, (product) => product.shop)
//   products: Product[];

//   @Field(() => String)
//   @CreateDateColumn()
//   createdAt?: Date;

//   @Field(() => String)
//   @UpdateDateColumn()
//   updatedAt?: Date = new Date();
// }
