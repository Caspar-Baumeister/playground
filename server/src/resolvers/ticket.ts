import { Ticket } from "../entities/Ticket";
import {
  Arg,
  Ctx,
  Float,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "..";
import { isAuthJWT } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  tickets(): Promise<Ticket[]> {
    return Ticket.find();
  }

  @Query(() => [Ticket], { nullable: true })
  @UseMiddleware(isAuthJWT)
  ticketsOfShop(@Ctx() { payload }: MyContext): Promise<Ticket[]> | null {
    if (!payload?.shopId) {
      return null;
    }
    return dataSource
      .getRepository(Ticket)
      .createQueryBuilder("ticket")
      .where("ticket.shopId = :id", { id: Number.parseFloat(payload.shopId) })
      .leftJoinAndSelect("ticket.pos", "pos")
      .leftJoinAndSelect("ticket.responsibleUser", "responsibleUser")
      .orderBy('ticket."updatedAt"', "DESC")
      .getMany();
  }

  @Query(() => [Ticket], { nullable: true })
  @UseMiddleware(isAuthJWT)
  ticketsOfUser(@Ctx() { payload }: MyContext): Promise<Ticket[]> | null {
    if (!payload?.shopId || !payload?.userId) {
      return null;
    }
    return dataSource
      .getRepository(Ticket)
      .createQueryBuilder("ticket")
      .where("ticket.shopId = :id", { id: Number.parseFloat(payload.shopId) })
      .where("ticket.responsibleUserId = :id", {
        id: Number.parseFloat(payload.userId),
      })
      .leftJoinAndSelect("ticket.pos", "pos")
      .leftJoinAndSelect("ticket.responsibleUser", "responsibleUser")
      .orderBy('ticket."updatedAt"', "DESC")
      .getMany();
  }

  @Mutation(() => Ticket, { nullable: true })
  @UseMiddleware(isAuthJWT)
  async createTicket(
    @Ctx() { payload }: MyContext,
    @Arg("responsibleUserId", () => ID) responsibleUserId: number,
    @Arg("posId", () => ID) posId: number,
    @Arg("startMoney", () => Float) startMoney: number,
    @Arg("endMoney", () => Float, { nullable: true }) endMoney: number,
    @Arg("status") status: number,
    @Arg("date", () => Date) date: string,
    @Arg("startComment", { nullable: true }) startComment: string,
    @Arg("midComment", { nullable: true }) midComment: string,
    @Arg("endComment", { nullable: true }) endComment: string
  ): Promise<Ticket | null> {
    // create ticket
    if (!payload?.shopId) {
      return null;
    }
    return Ticket.create({
      responsibleUserId,
      date,
      endComment,
      posId,
      startComment,
      startMoney,
      midComment,
      shopId: Number.parseFloat(payload.shopId),
      status,
      endMoney,
    }).save();
  }

  @Mutation(() => Ticket, { nullable: true })
  async updateTicket(
    @Arg("id", () => ID) id: number,
    @Arg("responsibleUserId", () => ID, { nullable: true })
    responsibleUserId: number,
    @Arg("posId", () => ID, { nullable: true }) posId: number,
    @Arg("startMoney", () => Float, { nullable: true }) startMoney: number,
    @Arg("endMoney", () => Float, { nullable: true }) endMoney: number,
    @Arg("status", { nullable: true }) status: number,
    @Arg("startComment", { nullable: true }) startComment: string,
    @Arg("midComment", { nullable: true }) midComment: string,
    @Arg("endComment", { nullable: true }) endComment: string
  ): Promise<Ticket | null> {
    const ticket = await Ticket.findOneBy({
      id,
    });
    if (!ticket) {
      return null;
    }
    if (responsibleUserId != null) {
      ticket.responsibleUserId = responsibleUserId;
    }
    if (posId != null) {
      ticket.posId = posId;
    }
    if (midComment != null) {
      ticket.midComment = midComment;
    }
    if (startMoney != null) {
      ticket.startMoney = startMoney;
    }
    if (endMoney != null) {
      ticket.endMoney = endMoney;
    }
    if (status != null) {
      ticket.status = status;
    }
    if (startComment != null) {
      ticket.startComment = startComment;
    }
    if (endComment != null) {
      ticket.endComment = endComment;
    }
    return ticket.save();
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
  async deleteAllTickets(): Promise<boolean> {
    await dataSource
      .getRepository(Ticket)
      .createQueryBuilder("ticket")
      .delete()
      .from(Ticket)
      .execute();

    return true;
  }
}
