import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "..";
import { Shop } from "../entities/Shop";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver()
export class ShopResolver {
  // all user of shop
  @Query(() => Shop)
  shopWithUsers(@Arg("shopId", () => ID) shopId: number): Promise<Shop | null> {
    return dataSource
      .getRepository(Shop)
      .createQueryBuilder("shop")
      .where("shop.id = :shopId", { shopId })
      .leftJoinAndSelect("shop.users", "users")
      .leftJoinAndSelect("users.user", "user")
      .leftJoinAndSelect("shop.creator", "creator")
      .getOne();
  }

  // queries all shops
  @Query(() => [Shop])
  shops(): Promise<Shop[]> {
    return dataSource
      .getRepository(Shop)
      .createQueryBuilder("shop")
      .leftJoinAndSelect("shop.creator", "creator")
      .getMany();
  }

  @Query(() => [Shop])
  myShops(@Ctx() { req }: MyContext): Promise<Shop[]> {
    return (
      dataSource
        .getRepository(Shop)
        .createQueryBuilder("shop")
        .leftJoinAndSelect("shop.creator", "creator")
        .where("shop.creatorId = :id", { id: req.session.userId })
        // .andWhere("creator.attribut = :isRemoved", { isRemoved: false })
        .orderBy('shop."updatedAt"', "DESC")
        .getMany()
    );
  }

  @Query(() => Shop, { nullable: true })
  shop(@Arg("id") id: number): Promise<Shop | null> {
    return Shop.findOneBy({ id });
  }

  @Mutation(() => Shop)
  @UseMiddleware(isAuth)
  async createShop(
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): Promise<Shop | null> {
    const shop = Shop.create({ name, creatorId: req.session.userId });
    return shop.save();
  }

  @Mutation(() => Shop, { nullable: true })
  async updateShop(
    @Arg("id") id: number,
    @Arg("name", () => String, { nullable: true }) name: string
  ): Promise<Shop | null> {
    const shop = await Shop.findOneBy({ id });
    if (!shop) {
      return null;
    }
    if (typeof name !== undefined) {
      Shop.update({ id }, { name });
    }
    return shop;
  }

  @Mutation(() => Boolean)
  async deleteShop(@Arg("id") id: number): Promise<boolean> {
    try {
      Shop.delete({ id });
    } catch (error) {
      return false;
    }
    return true;
  }
}
