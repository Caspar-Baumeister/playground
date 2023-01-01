import { Product } from "../entities/Product";
import { Arg, Mutation, Query, Resolver, Float, ID } from "type-graphql";
import { dataSource } from "..";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find();
  }

  // Products by shop id, tags and search term

  @Query(() => [Product])
  productsByShopId(@Arg("shopId") shopId: number): Promise<Product[]> {
    return dataSource
      .getRepository(Product)
      .createQueryBuilder("product")
      .where("product.shopId = :id", { id: shopId })
      .orderBy('"updatedAt"', "DESC")
      .getMany();
  }

  @Query(() => Product, { nullable: true })
  product(@Arg("id") id: number): Promise<Product | null> {
    return Product.findOneBy({ id });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("name") name: string,
    @Arg("price", () => Float) price: number,
    @Arg("amount", () => Float) amount: number,
    @Arg("amountType") amountType: number,
    @Arg("shopId") shopId: number,
    @Arg("tags", () => [ID], { nullable: true }) tags: number[]
  ): Promise<Product> {
    const product = Product.create({
      name,
      shopId,
      price,
      amount,
      amountType,
    });
    product.tags = await Tag.findBy({ id: In(tags) });
    return product.save();
  }

  @Mutation(() => Product, { nullable: true })
  async updateProductAmount(
    @Arg("id") id: number,
    @Arg("price", () => Float, { nullable: true }) price: number
  ): Promise<Product | null> {
    const product = await Product.findOneBy({ id });
    if (!product) {
      return null;
    }
    if (typeof price !== undefined) {
      await Product.update({ id }, { price });
    }
    return product;
  }

  @Mutation(() => Product, { nullable: true })
  async updateProductPrice(
    @Arg("id") id: number,
    @Arg("amount", () => Float, { nullable: true }) amount: number
  ): Promise<Product | null> {
    const product = await Product.findOneBy({ id });
    if (!product) {
      return null;
    }
    if (typeof amount !== undefined) {
      await Product.update({ id }, { amount });
    }
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: number): Promise<boolean> {
    try {
      Product.delete({ id });
    } catch (error) {
      return false;
    }
    return true;
  }
}
