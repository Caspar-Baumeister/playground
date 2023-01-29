import argon2 from "argon2";
import { sign } from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "..";
import { COOKIE_NAME } from "../constants";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuth";
import { MyContext } from "../types";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field({ nullable: true })
  accessToken?: string;
}

@Resolver()
export class UserResolver {
  // all user with their shop
  @Query(() => [User], { nullable: true })
  users(): Promise<User[] | null> {
    return dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.shop", "shop")
      .getMany();
  }

  // all user of a shop
  @Query(() => [User], { nullable: true })
  @UseMiddleware(isAuthJWT)
  userOfShop(@Ctx() { payload }: MyContext): Promise<User[]> | null {
    if (!payload?.userId) {
      return null;
    }
    return dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.shopId = :id", { id: Number.parseFloat(payload.userId) })
      .leftJoinAndSelect("user.shop", "shop")
      .getMany();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuthJWT)
  async me(@Ctx() { payload }: MyContext) {
    if (!payload?.userId) {
      return null;
    }
    return dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: Number.parseFloat(payload?.userId) })
      .leftJoinAndSelect("user.shop", "shop")
      .getOne();
  }

  // @Mutation(() => UserResponse)
  // async changePassword(
  //   @Arg("token") token: string,
  //   @Arg("newPassword") newPassword: string,
  //   @Ctx() { redis, req }: MyContext
  // ) {
  //   if (newPassword.length < 2) {
  //     return {
  //       errors: [
  //         {
  //           field: "newPassword",
  //           message: "lenght must be greater then 2",
  //         },
  //       ],
  //     };
  //   }
  //   const key = FORGET_PASSWORD_PREFIX + token;
  //   const userId = await redis.get(key);
  //   if (!userId) {
  //     return {
  //       errors: [
  //         {
  //           field: "token",
  //           message: "token expired",
  //         },
  //       ],
  //     };
  //   }
  //   const id = parseInt(userId);
  //   const user = await User.findOneBy({ id });
  //   if (!user) {
  //     return {
  //       errors: [
  //         {
  //           field: "token",
  //           message: "user no longer exist",
  //         },
  //       ],
  //     };
  //   }
  //   await User.update({ id }, { password: await argon2.hash(newPassword) });
  //   req.session.userId = parseInt(userId);
  //   await redis.del(key);
  //   return { user: user };
  // }

  // @Mutation(() => Boolean)
  // async forgotPassword(
  //   @Arg("email") email: string,
  //   @Ctx() { redis }: MyContext
  // ) {
  //   const user = await User.findOneBy({ email });
  //   if (!user) {
  //     return true;
  //   }
  //   const token = v4();
  //   await redis.set(
  //     FORGET_PASSWORD_PREFIX + token,
  //     user.id,
  //     "EX",
  //     1000 * 60 * 60 * 24 * 3
  //   ); // 3 DAYS
  //   sendEmail(
  //     email,
  //     `<a href= "http://localhost:3000/change-password/${token}"> reset password </a>`
  //   );
  //   return true;
  // }

  @Mutation(() => LoginResponse)
  @UseMiddleware(isAuthJWT)
  async addEmployee(
    @Ctx() { payload }: MyContext,
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("role") role: number
  ): Promise<LoginResponse> {
    if (!payload?.userId) {
      return {
        errors: [
          {
            field: "shopId",
            message: "no shopId in token",
          },
        ],
      };
    }
    if (name.length <= 2) {
      return {
        errors: [
          {
            field: "name",
            message: "invalid name",
          },
        ],
      };
    }
    if (email.length <= 2) {
      return {
        errors: [
          {
            field: "email",
            message: "invalid email",
          },
        ],
      };
    }
    if (password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "invalid password",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    try {
      await User.create({
        email,
        password: hashedPassword,
        name,
        shopId: Number.parseInt(payload.shopId),
        role,
      }).save();
    } catch (error) {
      console.log("ERR", error);
      if (error.code === "23505" || error.detail.includes["already exists"]) {
        return {
          errors: [
            {
              field: "email",
              message: "email already exists",
            },
          ],
        };
      }
      return {
        errors: [
          {
            field: "email",
            message: error.detail,
          },
        ],
      };
    }

    return {};
  }

  @Mutation(() => LoginResponse)
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("shopId", () => ID) shopId: number,
    @Arg("role") role: number
  ): Promise<LoginResponse> {
    if (name.length <= 2) {
      return {
        errors: [
          {
            field: "name",
            message: "invalid name",
          },
        ],
      };
    }
    if (email.length <= 2) {
      return {
        errors: [
          {
            field: "email",
            message: "invalid email",
          },
        ],
      };
    }
    if (password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "invalid password",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    let user;
    try {
      user = await User.create({
        email,
        password: hashedPassword,
        name,
        shopId,
        role,
      }).save();
    } catch (error) {
      if (error.code === "23505" || error.detail.includes["already exists"]) {
        return {
          errors: [
            {
              field: "email",
              message: "email already exists",
            },
          ],
        };
      }
      return {
        errors: [
          {
            field: "email",
            message: error.detail,
          },
        ],
      };
    }
    return {
      accessToken: sign(
        { userId: user.id, shopId: user.shopId },
        "MySecretKey",
        {
          expiresIn: "365 days",
        }
      ),
    };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOneBy({ email: email });
    console.log("inside login", user);
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "email doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    return {
      accessToken: sign(
        { userId: user.id, shopId: user.shopId },
        "MySecretKey",
        {
          expiresIn: "365 days",
        }
      ),
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        } else {
          resolve(true);
        }
      })
    );
  }
}
