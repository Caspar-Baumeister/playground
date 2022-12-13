import { Request, Response } from "express";
import { Session } from "express-session";
import Redis from "ioredis";
import { Field, ObjectType } from "type-graphql";

export type MyContext = {
  // em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session & { userId?: number; shopId?: number } };
  res: Response;
  redis: Redis;
};

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
