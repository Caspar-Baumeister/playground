
import { Product } from "../entities/Product";
import { Arg, Mutation, Query, Resolver } from "type-graphql";


@Resolver()
export class ProductResolver {
    @Query(() => [Product])
    products(
    ): Promise<Product[]> {
        return Product.find()
    }

    @Query(() => Product, {nullable: true})
    product(
       @Arg('id') _id: number,
    ): Promise<Product| null> {
        return Product.findOneBy({_id})
    }

    @Mutation(() => Product)
   async createProduct(
        @Arg('title') title: string,
    ): Promise<Product> {
      
        return Product.create({title}).save()
    }

    @Mutation(() => Product,  {nullable: true})
    async updateProduct(
        @Arg('id') _id: number,
        @Arg('title', () => String, {nullable: true}) title: string,
     ): Promise<Product | null> {
         const product = await Product.findOneBy({_id})
        if (!product) {
            return null;
        }
        if (typeof title !== undefined) {
            Product.update({_id} ,{title});
        }
         return product
     }

     @Mutation(() => Boolean)
    async deleteProduct(
        @Arg('id') _id: number,
        
     ): Promise<boolean> {
        
         
         
         try {
            Product.delete({_id})
            
         } catch (error) {
            return false;
         }
         
        
       
         return true;
     }
}