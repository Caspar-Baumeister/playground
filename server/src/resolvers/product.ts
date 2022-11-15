
import { Product } from "../entities/Product";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";


@Resolver()
export class ProductResolver {
    @Query(() => [Product])
    products(
        @Ctx() {em}: MyContext
    ): Promise<Product[]> {
        const fork = em.fork();
        return fork.find(Product, {})
    }

    @Query(() => Product, {nullable: true})
    product(
       @Arg('id',  () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<Product| null> {
        const fork = em.fork();
        return fork.findOne(Product, {_id:id })
    }

    @Mutation(() => Product)
   async createProduct(
        @Arg('title') title: string,
        @Ctx() {em}: MyContext
    ): Promise<Product> {
        const fork = em.fork();
        const product = fork.create(Product, {title});
        await fork.persistAndFlush(Product);
        return product
    }

    @Mutation(() => Product,  {nullable: true})
    async updateProduct(
        @Arg('id') id: number,
        @Arg('title', () => String, {nullable: true}) title: string,
        @Ctx() {em}: MyContext
     ): Promise<Product | null> {
         const fork = em.fork();
         const product = await fork.findOne(Product, {_id:id })
        if (!product) {
            return null;
        }
        if (typeof title !== undefined) {
            product.title = title;
            await fork.persistAndFlush(product);
        }
         return product
     }

     @Mutation(() => Boolean)
    async deleteProduct(
        @Arg('id',  () => Int) id: number,
         @Ctx() {em}: MyContext
     ): Promise<boolean> {
        
         const fork = em.fork();
         
         try {
            fork.nativeDelete(Product, {_id: id})
            
         } catch (error) {
            return false;
         }
         
        
       
         return true;
     }
}