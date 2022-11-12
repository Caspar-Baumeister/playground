
import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";


@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(
        @Ctx() {em}: MyContext
    ): Promise<Post[]> {
        const fork = em.fork();
        return fork.find(Post, {})
    }

    @Query(() => Post, {nullable: true})
    post(
       @Arg('id',  () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<Post| null> {
        const fork = em.fork();
        return fork.findOne(Post, {_id:id })
    }

    @Mutation(() => Post)
   async createPost(
        @Arg('title') title: string,
        @Ctx() {em}: MyContext
    ): Promise<Post> {
        const fork = em.fork();
        const post = fork.create(Post, {title});
        await fork.persistAndFlush(post);
        return post
    }

    @Mutation(() => Post,  {nullable: true})
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, {nullable: true}) title: string,
        @Ctx() {em}: MyContext
     ): Promise<Post | null> {
         const fork = em.fork();
         const post = await fork.findOne(Post, {_id:id })
        if (!post) {
            return null;
        }
        if (typeof title !== undefined) {
            post.title = title;
            await fork.persistAndFlush(post);
        }
         return post
     }

     @Mutation(() => Boolean)
    async deletePost(
        @Arg('id',  () => Int) id: number,
         @Ctx() {em}: MyContext
     ): Promise<boolean> {
        
         const fork = em.fork();
         
         try {
            fork.nativeDelete(Post, {_id: id})
            
         } catch (error) {
            return false;
         }
         
        
       
         return true;
     }
}