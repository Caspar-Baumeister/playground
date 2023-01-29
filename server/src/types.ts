import { Request, Response } from "express";
import { Session } from "express-session";
import { Field, ObjectType } from "type-graphql";

export type MyContext = {
  // em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session & { userId?: number; shopId?: number } };
  res: Response;
  payload?: { userId: string; shopId: string };
};

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
