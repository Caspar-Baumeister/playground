import { Ticket } from "../entities/Ticket";
import { Arg, Float, ID, Mutation, Query, Resolver } from "type-graphql";
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

  @Query(() => [Ticket])
  ticketsByShopIdAndUserId(
    @Arg("shopId", () => ID) shopId: number,
    @Arg("userId", () => ID) userId: number
  ): Promise<Ticket[]> {
    return dataSource
      .getRepository(Ticket)
      .createQueryBuilder("ticket")
      .where("ticket.shopId = :id", { id: shopId })
      .andWhere("ticket.responsibleUserId = :id", { id: userId })
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
    @Arg("shopId", () => ID) shopId: number,
    @Arg("status") status: number,
    @Arg("date", () => Date) date: string,
    @Arg("startComment", { nullable: true }) startComment: string,
    @Arg("endComment", { nullable: true }) endComment: string
  ): Promise<Ticket> {
    // create ticket
    return Ticket.create({
      responsibleUserId,
      date,
      endComment,
      posId,
      startComment,
      startMoney,
      shopId,
      status,
      endMoney,
    }).save();
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

  @Mutation(() => Boolean)
  async deleteTicket(@Arg("id") id: number): Promise<boolean> {
    try {
      Ticket.delete({ id });
    } catch (error) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteAll(): Promise<boolean> {
    await dataSource
      .getRepository(Ticket)
      .createQueryBuilder("ticket")
      .delete()
      .from(Ticket)
      .execute();

    return true;
  }
}
