import { Arg, ID, Mutation, Resolver } from "type-graphql";
import { ShopUser } from "../entities/ShopUser";

@Resolver()
export class ShopUserResolver {
  // create a shopuser
  @Mutation(() => ShopUser)
  async createShopUser(
    @Arg("shopId", () => ID) shopId: number,
    @Arg("userId", () => ID) userId: number,
    @Arg("role") role: string
  ): Promise<ShopUser | null> {
    return ShopUser.create({ shopId, userId, role }).save();
  }
}
