import { isAuthJWT } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "..";
import { Shop } from "../entities/Shop";

@Resolver()
export class ShopResolver {
  // all user of shop
  @Query(() => Shop)
  @UseMiddleware(isAuthJWT)
  shopWithUsers(@Ctx() { payload }: MyContext): Promise<Shop | null> | null {
    if (!payload?.shopId) {
      return null;
    }
    return dataSource
      .getRepository(Shop)
      .createQueryBuilder("shop")
      .where("shop.id = :shopId", { shopId: Number.parseFloat(payload.shopId) })
      .leftJoinAndSelect("shop.users", "users")
      .getOne();
  }

  // queries all shops
  @Query(() => [Shop])
  shops(): Promise<Shop[]> {
    return dataSource.getRepository(Shop).createQueryBuilder("shop").getMany();
  }

  @Query(() => Shop, { nullable: true })
  shop(@Arg("id") id: number): Promise<Shop | null> {
    return Shop.findOneBy({ id });
  }

  @Mutation(() => Shop)
  async createShop(@Arg("name") name: string): Promise<Shop | null> {
    const shop = Shop.create({ name });
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
