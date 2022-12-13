import { Warehouse } from "../entities/Warehouse";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class WarehouseResolver {
  @Query(() => [Warehouse])
  warehousesOfShop(@Arg("shopId") _shopId: number): Promise<Warehouse[]> {
    return Warehouse.findBy({ shopId: _shopId });
  }

  @Query(() => Warehouse, { nullable: true })
  warehouse(@Arg("id") _id: number): Promise<Warehouse | null> {
    return Warehouse.findOneBy({ _id });
  }

  @Mutation(() => Warehouse)
  async createWarehouse(
    @Arg("name") name: string,
    @Arg("location") location: string,
    @Arg("shopId") shopId: number
  ): Promise<Warehouse> {
    return Warehouse.create({ name, location, shopId }).save();
  }

  @Mutation(() => Warehouse, { nullable: true })
  async updateWarehouse(
    @Arg("id") _id: number,
    @Arg("location") location: string,
    @Arg("name") name: string
  ): Promise<Warehouse | null> {
    const warehouse = await Warehouse.findOneBy({ _id });
    if (!warehouse) {
      return null;
    }
    if (typeof name !== undefined) {
      await Warehouse.update({ _id }, { name });
    }
    if (typeof location !== undefined) {
      await Warehouse.update({ _id }, { location });
    }
    return warehouse;
  }

  @Mutation(() => Boolean)
  async deleteWarehouse(@Arg("id") _id: number): Promise<boolean> {
    try {
      Warehouse.delete({ _id });
    } catch (error) {
      return false;
    }
    return true;
  }
}
