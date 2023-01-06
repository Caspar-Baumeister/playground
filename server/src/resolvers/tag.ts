import { dataSource } from "..";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  tags(): Promise<Tag[]> {
    return Tag.find();
  }

  @Query(() => [Tag])
  tagsByShopId(@Arg("shopId") shopId: number): Promise<Tag[]> {
    return dataSource
      .getRepository(Tag)
      .createQueryBuilder("tag")
      .where("tag.shopId = :id", { id: shopId })
      .orderBy("tag.updatedAt", "DESC")
      .getMany();
  }

  @Query(() => [Tag])
  tagsByShopIdWithProducts(@Arg("shopId") shopId: number): Promise<Tag[]> {
    return dataSource
      .getRepository(Tag)
      .createQueryBuilder("tag")
      .where("tag.shopId = :id", { id: shopId })
      .leftJoinAndSelect("tag.products", "product")
      .leftJoinAndSelect("product.tags", "tags")
      .orderBy("tag.updatedAt", "DESC")
      .orderBy("product.updatedAt", "DESC")
      .getMany();
  }

  @Query(() => [Tag])
  tagsByIdsWithProducts(
    @Arg("shopId") shopId: number,
    @Arg("ids", () => [ID]) ids: number[]
  ): Promise<Tag[]> {
    return dataSource
      .getRepository(Tag)
      .createQueryBuilder("tag")
      .where("tag.shopId = :id", { id: shopId })
      .where("tag.id IN(:...ids)", { ids })
      .leftJoinAndSelect("tag.products", "product")
      .leftJoinAndSelect("product.tags", "tags")
      .orderBy("tag.updatedAt", "DESC")
      .orderBy("product.updatedAt", "DESC")
      .getMany();
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg("shopId") shopId: number,
    @Arg("name") name: string,
    @Arg("description", { nullable: true }) description: string
  ): Promise<Tag> {
    return Tag.create({ name, shopId, description }).save();
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
