import { Product } from "../entities/Product";
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Float,
  ID,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "..";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";
import { MyContext } from "../types";
import { isAuthJWT } from "../middleware/isAuth";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find();
  }

  @Query(() => [Product], { nullable: true })
  @UseMiddleware(isAuthJWT)
  productsOfShop(@Ctx() { payload }: MyContext): Promise<Product[]> | null {
    if (!payload?.shopId) {
      return null;
    }
    return dataSource
      .getRepository(Product)
      .createQueryBuilder("product")
      .where("product.shopId = :id", { id: Number.parseFloat(payload!.shopId) })
      .leftJoinAndSelect("product.tags", "tags")
      .orderBy('product."updatedAt"', "DESC")
      .getMany();
  }

  @Query(() => Product, { nullable: true })
  product(@Arg("id") id: number): Promise<Product | null> {
    return dataSource
      .getRepository(Product)
      .createQueryBuilder("product")
      .where("product.id = :id", { id: id })
      .leftJoinAndSelect("product.tags", "tags")
      .getOne();
  }

  @Mutation(() => Product, { nullable: true })
  @UseMiddleware(isAuthJWT)
  async createProduct(
    @Arg("name") name: string,
    @Arg("price", () => Float) price: number,
    @Arg("amount", () => Float) amount: number,
    @Arg("amountType") amountType: number,
    @Arg("tags", () => [ID], { nullable: true }) tags: number[],
    @Ctx() { payload }: MyContext
  ): Promise<Product | null> {
    console.log("payload", payload);
    if (!payload?.shopId) {
      return null;
    }
    const product = Product.create({
      name,
      shopId: Number.parseFloat(payload!.shopId),
      price,
      amount,
      amountType,
    });
    product.tags = await Tag.findBy({ id: In(tags) });
    return product.save();
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("id", () => ID) id: number,
    @Arg("name", { nullable: true }) name: string,
    @Arg("price", () => Float, { nullable: true }) price: number,
    @Arg("amount", () => Float, { nullable: true }) amount: number,
    @Arg("amountType", { nullable: true }) amountType: number,
    @Arg("tags", () => [ID], { nullable: true }) tags: number[]
  ): Promise<Product | null> {
    const product = await Product.findOneBy({ id });
    if (!product) {
      return null;
    }
    if (name) {
      product.name = name;
    }
    if (price >= 0) {
      product.price = price;
    }
    if (amount >= 0) {
      product.amount = amount;
    }
    if (amountType == 1 || amountType == 0) {
      product.amountType = amountType;
    }
    if (tags) {
      product.tags = await Tag.findBy({ id: In(tags) });
    }

    return product.save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id", () => ID) id: number): Promise<boolean> {
    try {
      Product.delete({ id });
    } catch (error) {
      return false;
    }
    return true;
  }

  // @Query(() => [Product])
  // productsWithTagIds(
  //   @Arg("ids", () => [ID]) ids: number[],
  //   @Arg("shopId") shopId: number
  // ): Promise<Product[]> {
  //   return dataSource
  //     .getRepository(Product)
  //     .createQueryBuilder("product")
  //     .where("product.shopId = :id", { id: shopId })
  //     .where('product."tagsId" IN(:...ids)', { ids })
  //     .orderBy('"updatedAt"', "DESC")
  //     .getMany();
  // }

  // @Mutation(() => Product, { nullable: true })
  // async updateProductAmount(
  //   @Arg("id", () => ID) id: number,
  //   @Arg("price", () => Float, { nullable: true }) price: number
  // ): Promise<Product | null> {
  //   const product = await Product.findOneBy({ id });
  //   if (!product) {
  //     return null;
  //   }
  //   if (typeof price !== undefined) {
  //     await Product.update({ id }, { price });
  //   }
  //   return product;
  // }

  // @Mutation(() => Product, { nullable: true })
  // async updateProductPrice(
  //   @Arg("id", () => ID) id: number,
  //   @Arg("amount", () => Float, { nullable: true }) amount: number
  // ): Promise<Product | null> {
  //   const product = await Product.findOneBy({ id });
  //   if (!product) {
  //     return null;
  //   }
  //   if (typeof amount !== undefined) {
  //     await Product.update({ id }, { amount });
  //   }
  //   return product;
  // }
}
