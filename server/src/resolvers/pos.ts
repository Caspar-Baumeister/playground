import { PointOfSell } from "../entities/PointOfSell";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { dataSource } from "..";

@Resolver()
export class PosResolver {
  @Query(() => [PointOfSell])
  allPointOfSell(): Promise<PointOfSell[]> {
    return PointOfSell.find();
  }

  @Query(() => [PointOfSell])
  posByShopId(@Arg("shopId") shopId: number): Promise<PointOfSell[]> {
    return dataSource
      .getRepository(PointOfSell)
      .createQueryBuilder("pos")
      .where("pos.shopId = :id", { id: shopId })
      .orderBy("pos.updatedAt", "DESC")
      .getMany();
  }

  @Mutation(() => PointOfSell)
  async createPointOfSell(
    @Arg("shopId") shopId: number,
    @Arg("name") name: string
  ): Promise<PointOfSell> {
    return PointOfSell.create({ name, shopId }).save();
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
