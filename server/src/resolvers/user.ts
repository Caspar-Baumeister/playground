import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { v4 } from "uuid";
import { dataSource } from "..";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { sendEmail } from "../utiles/sendEmail";
import { sign } from "jsonwebtoken";
import { isAuthJWT } from "../middleware/isAuth";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field()
  accessToken?: string;
}

@Resolver()
export class UserResolver {
  // all users
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  // all user of shop
  @Query(() => [User])
  usersWithShops(): Promise<User[] | null> {
    return (
      dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        // .where(":shopId NOT IN(...user.shopUsers)", { shopId })
        .leftJoinAndSelect("user.shopUsers", "su")
        .leftJoinAndSelect("su.shop", "shop")
        .getMany()
    );
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuthJWT)
  async me(@Ctx() { payload }: MyContext) {
    if (!payload?.userId) {
      return null;
    }
    return await User.findOneBy({ id: Number.parseFloat(payload?.userId) });
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ) {
    if (newPassword.length < 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "lenght must be greater then 2",
          },
        ],
      };
    }
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }
    const id = parseInt(userId);
    const user = await User.findOneBy({ id });
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exist",
          },
        ],
      };
    }
    await User.update({ id }, { password: await argon2.hash(newPassword) });
    req.session.userId = parseInt(userId);
    await redis.del(key);
    return { user: user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOneBy({ email });
    if (!user) {
      return true;
    }
    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 24 * 3
    ); // 3 DAYS
    sendEmail(
      email,
      `<a href= "http://localhost:3000/change-password/${token}"> reset password </a>`
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
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
        email: email,
        password: hashedPassword,
        name: name,
      }).save();

      // This is how you could create and save an user with a querybuilder
      //    const result = await dataSource
      //         .createQueryBuilder()
      //         .insert()
      //         .into(user)
      //         .values([
      //             {email: email, password: hashedPassword },
      //         ]).returning("*")
      //         .execute()
      //     user = result.raw[0]
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
    req.session.userId = user.id;
    console.log(req.session.userId);
    return { user: user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
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

    req.session.userId = user.id;
    console.log("userpassword is valid", req.session.userId);
    return {
      accessToken: sign({ userId: user.id }, "MySecretKey", {
        expiresIn: "365 days",
      }),
    };
    // return { user: user };
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
