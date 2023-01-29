import { dataSource } from "..";
import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Tag } from "../entities/Tag";
import { MyContext } from "../types";
import { isAuthJWT } from "../middleware/isAuth";

@Resolver()
export class TagResolver {
  @Query(() => [Tag], { nullable: true })
  tags(): Promise<Tag[]> {
    return Tag.find();
  }

  @Query(() => [Tag], { nullable: true })
  @UseMiddleware(isAuthJWT)
  tagsByShopId(@Ctx() { payload }: MyContext): Promise<Tag[]> | null {
    if (!payload?.shopId) {
      return null;
    }
    return dataSource
      .getRepository(Tag)
      .createQueryBuilder("tag")
      .where("tag.shopId = :id", {
        id: Number.parseFloat(payload.shopId),
      })
      .orderBy("tag.updatedAt", "DESC")
      .getMany();
  }

  @Query(() => [Tag], { nullable: true })
  @UseMiddleware(isAuthJWT)
  tagsByShopIdWithProducts(@Ctx() { payload }: MyContext): Promise<Tag[]> {
    return dataSource
      .getRepository(Tag)
      .createQueryBuilder("tag")
      .where("tag.shopId = :id", {
        id: Number.parseFloat(payload?.shopId ?? ""),
      })
      .leftJoinAndSelect("tag.products", "product")
      .leftJoinAndSelect("product.tags", "tags")
      .orderBy("tag.updatedAt", "DESC")
      .orderBy("product.updatedAt", "DESC")
      .getMany();
  }

  @Query(() => [Tag], { nullable: true })
  @UseMiddleware(isAuthJWT)
  tagsByIdsWithProducts(
    @Ctx() { payload }: MyContext,
    @Arg("ids", () => [ID]) ids: number[]
  ): Promise<Tag[]> {
    return dataSource
      .getRepository(Tag)
      .createQueryBuilder("tag")
      .where("tag.shopId = :id", {
        id: Number.parseFloat(payload?.shopId ?? ""),
      })
      .where("tag.id IN(:...ids)", { ids })
      .leftJoinAndSelect("tag.products", "product")
      .leftJoinAndSelect("product.tags", "tags")
      .orderBy("tag.updatedAt", "DESC")
      .orderBy("product.updatedAt", "DESC")
      .getMany();
  }

  @Mutation(() => Tag, { nullable: true })
  @UseMiddleware(isAuthJWT)
  async createTag(
    @Ctx() { payload }: MyContext,
    @Arg("name") name: string,
    @Arg("description", { nullable: true }) description: string
  ): Promise<Tag | null> {
    console.log("payload", payload);
    if (!payload?.shopId) {
      return null;
    }
    return Tag.create({
      name,
      shopId: Number.parseFloat(payload?.shopId ?? ""),
      description,
    }).save();
  }

  @Mutation(() => Tag, { nullable: true })
  async updateTag(
    @Arg("id") id: number,
    @Arg("name", () => String, { nullable: true }) name: string
  ): Promise<Tag | null> {
    const tag = await Tag.findOneBy({ id });
    if (!tag) {
      return null;
    }
    if (typeof name !== undefined) {
      await Tag.update({ id }, { name });
    }
    return tag;
  }

  @Mutation(() => Boolean)
  async deleteTag(@Arg("id") id: number): Promise<boolean> {
    try {
      Tag.delete({ id });
    } catch (error) {
      return false;
    }
    return true;
  }
}
