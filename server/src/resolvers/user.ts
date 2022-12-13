import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utiles/sendEmail";
import { v4 } from "uuid";

// @InputType()
// class EmailAndPassword {
//   @Field()
//   email: string;
//   @Field()
//   password: string;
// }

// @InputType()
// class NameEmailAndPassword {
//   @Field()
//   name: string;
//   @Field()
//   email: string;
//   @Field()
//   password: string;
// }

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

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return await User.findOneBy({ _id: req.session.userId });
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
    const _id = parseInt(userId);
    const user = await User.findOneBy({ _id });
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
    await User.update({ _id }, { password: await argon2.hash(newPassword) });
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
      user._id,
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
    req.session.userId = user._id;
    console.log(req.session.userId);
    return { user: user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOneBy({ email: email });
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

    req.session.userId = user._id;
    return { user: user };
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
