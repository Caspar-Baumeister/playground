import { PointOfSell } from "../entities/PointOfSell";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "..";
import { isAuthJWT } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver()
export class PosResolver {
  @Query(() => [PointOfSell])
  allPointOfSell(): Promise<PointOfSell[]> {
    return PointOfSell.find();
  }

  @Query(() => [PointOfSell], { nullable: true })
  @UseMiddleware(isAuthJWT)
  posOfShop(@Ctx() { payload }: MyContext): Promise<PointOfSell[]> | null {
    if (!payload?.shopId) {
      return null;
    }
    return dataSource
      .getRepository(PointOfSell)
      .createQueryBuilder("pos")
      .where("pos.shopId = :id", { id: Number.parseFloat(payload.shopId) })
      .orderBy("pos.updatedAt", "DESC")
      .getMany();
  }

  @Mutation(() => PointOfSell)
  @UseMiddleware(isAuthJWT)
  async createPointOfSell(
    @Ctx() { payload }: MyContext,
    @Arg("name") name: string
  ): Promise<PointOfSell | null> {
    if (!payload?.shopId) {
      return null;
    }
    return PointOfSell.create({
      name,
      shopId: Number.parseFloat(payload.shopId),
    }).save();
  }

  @Mutation(() => Boolean)
  async deletePointOfSell(@Arg("id") id: number): Promise<boolean> {
    try {
      PointOfSell.delete({ id });
    } catch (error) {
      return false;
    }
    return true;
  }
}
