import { dataSource } from "..";
import { Arg, Float, ID, Mutation, Query, Resolver } from "type-graphql";
import { TicketProduct } from "../entities/TicketProduct";

@Resolver()
export class TicketProductResolver {
  // create a TicketProduct
  // @Mutation(() => TicketProduct)
  // async createTicketProduct(
  //   @Arg("productId", () => ID) productId: number,
  //   @Arg("ticketId", () => ID) ticketId: number,
  //   @Arg("startAmount", () => Float) startAmount: number
  // ): Promise<TicketProduct | null> {
  //   return TicketProduct.create({ productId, ticketId, startAmount }).save();
  // }

  @Mutation(() => Boolean)
  async createTicketProducts(
    @Arg("productIds", () => [ID]) productIds: number[],
    @Arg("ticketId", () => ID) ticketId: number,
    @Arg("startAmounts", () => [Float]) startAmounts: number[]
  ): Promise<boolean> {
    productIds.forEach(async (productId, index) => {
      const startAmount = startAmounts[index];
      if (startAmount > 0) {
        await TicketProduct.create({
          productId,
          ticketId,
          startAmount,
        }).save();
      }
    });
    return true;
  } //

  @Mutation(() => TicketProduct, { nullable: true })
  async updateTicketProduct(
    @Arg("ticketId", () => ID) ticketId: number,
    @Arg("productId", () => ID) productId: number,
    @Arg("startAmount") startAmount: number,
    @Arg("endAmount") endAmount: number
  ): Promise<TicketProduct | null> {
    const ticketProduct = await TicketProduct.findOneBy({
      ticketId,
      productId,
    });
    if (!ticketProduct) {
      return null;
    }
    if (startAmount >= 0) {
      ticketProduct.startAmount = startAmount;
    }
    if (endAmount >= 0) {
      ticketProduct.endAmount = endAmount;
    }

    return ticketProduct.save();
  }

  @Query(() => [TicketProduct], { nullable: true })
  ticketProducts(
    @Arg("ticketId", () => ID) ticketId: number
  ): Promise<TicketProduct[] | null> {
    return dataSource
      .getRepository(TicketProduct)
      .createQueryBuilder("tp")
      .where("tp.ticketId = :id", { id: ticketId })
      .leftJoinAndSelect("tp.product", "product")
      .getMany();
  }
}
