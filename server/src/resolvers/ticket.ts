import { Ticket } from "../entities/Ticket";
import { Arg, Float, ID, Mutation, Query, Resolver } from "type-graphql";
import { TicketProduct } from "../entities/TicketProduct";
import { dataSource } from "..";

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  tickets(): Promise<Ticket[]> {
    return Ticket.find();
  }

  @Query(() => [Ticket])
  ticketsByShopId(@Arg("shopId", () => ID) shopId: number): Promise<Ticket[]> {
    return dataSource
      .getRepository(Ticket)
      .createQueryBuilder("ticket")
      .where("ticket.shopId = :id", { id: shopId })
      .leftJoinAndSelect("ticket.pos", "pos")
      .leftJoinAndSelect("ticket.responsibleUser", "responsibleUser")
      .orderBy('ticket."updatedAt"', "DESC")
      .getMany();
  }

  @Mutation(() => Ticket)
  async createTicket(
    @Arg("responsibleUserId", () => ID) responsibleUserId: number,
    @Arg("posId", () => ID) posId: number,
    @Arg("startMoney", () => Float) startMoney: number,
    @Arg("endMoney", () => Float, { nullable: true }) endMoney: number,
    @Arg("shopId") shopId: number,
    @Arg("status") status: number,
    @Arg("date") date: string,
    @Arg("startComment", { nullable: true }) startComment: string,
    @Arg("endComment", { nullable: true }) endComment: string,
    @Arg("productIds", () => [ID]) productIds: number[],
    @Arg("startAmounts", () => [Float]) startAmounts: number[]
  ): Promise<Ticket> {
    // create ticket
    const ticket = Ticket.create({
      responsibleUserId,
      date,
      endComment,
      posId,
      startComment,
      startMoney,
      shopId,
      status,
      endMoney,
    });

    await ticket.save();

    // create and save TicketProducts
    productIds.forEach(async (value, index) => {
      const ticketProduct = TicketProduct.create({
        productId: value,
        ticketId: ticket.id,
        startAmount: startAmounts[index],
      });
      await ticketProduct.save();
    });

    // TODO put the TicketProducts inside the ticket???
    return ticket;
  }

  @Query(() => Ticket, { nullable: true })
  ticket(@Arg("id", () => ID) id: number): Promise<Ticket | null> {
    return (
      dataSource
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", { id })
        //   .leftJoinAndSelect("ticket.ticketProducts", "ticketProducts")
        .getOne()
    );
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

  @Mutation(() => Boolean)
  async deleteTicket(@Arg("id") id: number): Promise<boolean> {
    try {
      Ticket.delete({ id });
    } catch (error) {
      return false;
    }
    return true;
  }
}

//   @Mutation(() => Ticket)
//   async createTicket(
//     @Arg("responsibleUserId", () => ID) responsibleUserId: number,
//     @Arg("posId", () => ID) posId: number,
//     @Arg("startMoney", () => Float) startMoney: number,
//     @Arg("endMoney", () => Float, { nullable: true }) endMoney: number,
//     @Arg("shopId") shopId: number,
//     @Arg("status") status: number,
//     @Arg("date") date: string,
//     @Arg("startComment", { nullable: true }) startComment: string,
//     @Arg("endComment", { nullable: true }) endComment: string,
//     @Arg("productIds", () => [ID]) productIds: number[],
//     @Arg("startAmounts", () => [Float]) startAmounts: number[]
//   ): Promise<Ticket> {
//     // create ticket
//     const ticket = Ticket.create({
//       responsibleUserId,
//       date,
//       endComment,
//       posId,
//       startComment,
//       startMoney,
//       shopId,
//       status,
//       endMoney,
//     });

//     console.log("ticket safed", ticket);

//     // create productTickets
//     let ticketProducts: TicketProduct[] = Array(productIds.length);
//     productIds.forEach(async (value, index) => {
//       const ticketProduct = TicketProduct.create({
//         productId: value,
//         ticket: ticket,
//         startAmount: startAmounts[index],
//       });
//       //   await ticketProduct.save(); //
//       ticketProducts[index] = ticketProduct;

//       console.log("ticketProducts[index]", ticketProducts[index]);
//     });

//     console.log("startProducts::", ticketProducts);
//     // put the product tickets as startProducts for the ticket
//     ticket.ticketProducts = ticketProducts;

//     console.log("startProducts created", ticket);

//     // save the new ticket and return the response
//     return ticket.save();
//   }
