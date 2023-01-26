import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};

//format like bearer 21321n2bmbbj

export const isAuthJWT: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  console.log("authorization", authorization);

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, "MySecretKey");
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.log(err); //
    throw new Error("Not authenticated");
  }
  return next();
};
