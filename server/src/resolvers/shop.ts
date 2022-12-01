import { Shop } from "../entities/Shop";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { dataSource } from "..";
// import { Product } from "src/entities/Product";

@Resolver()
export class ShopResolver {
  @Query(() => [Shop])
  shops(
    @Arg("limit", () => Int) limit: number,
    @Ctx() { req }: MyContext
  ): Promise<Shop[]> {
    const realLimit = Math.min(10, limit);
    return dataSource
      .getRepository(Shop)
      .createQueryBuilder("shop")
      .where("shop.creatorId = :id", { id: req.session.userId })
      .orderBy('"updatedAt"', "DESC")
      .take(realLimit)
      .getMany();
  }

  // // get all shop products
  // @Query(() => [Product])
  // shopProducts(
  //   @Arg("limit", () => Int) limit: number,
  //   @Ctx() { req }: MyContext
  // ): Promise<Product[]> {
  //   const realLimit = Math.min(10, limit);
  //   return dataSource
  //     .getRepository(Shop)
  //     .createQueryBuilder("shop")
  //     .where("shop.creatorId = :id", { id: req.session.userId })
  //     .orderBy('"updatedAt"', "DESC")
  //     .take(realLimit)
  //     .getMany();
  // }

  @Query(() => Shop, { nullable: true })
  shop(@Arg("id") _id: number): Promise<Shop | null> {
    return Shop.findOneBy({ _id });
  }

  @Mutation(() => Shop)
  @UseMiddleware(isAuth)
  async createShop(
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): Promise<Shop> {
    return Shop.create({ name, creatorId: req.session.userId }).save();
  }

  @Mutation(() => Shop, { nullable: true })
  async updateShop(
    @Arg("id") _id: number,
    @Arg("name", () => String, { nullable: true }) name: string
  ): Promise<Shop | null> {
    const shop = await Shop.findOneBy({ _id });
    if (!shop) {
      return null;
    }
    if (typeof name !== undefined) {
      Shop.update({ _id }, { name });
    }
    return shop;
  }

  @Mutation(() => Boolean)
  async deleteShop(@Arg("id") _id: number): Promise<boolean> {
    try {
      Shop.delete({ _id });
    } catch (error) {
      return false;
    }
    return true;
  }
}
