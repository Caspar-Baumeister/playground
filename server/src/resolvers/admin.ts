
import { Admin } from "../entities/Admin";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utiles/sendEmail";
import { v4 } from "uuid";
import { dataSource } from "..";


@InputType()
class EmailAndPassword {
    @Field()
    email: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field() 
    field: string
    @Field()
    message: string
}

@ObjectType()
class AdminResponse {
    @Field( () => [FieldError], {nullable: true})
    errors?: FieldError[]
    @Field( () => Admin, {nullable: true})
    admin?: Admin
}

@Resolver()
export class AdminResolver {

    @Query(() => Admin, {nullable:true})
    async me(@Ctx() {req}: MyContext) {
        if(!req.session.adminId) {
            return null
        }
        return await Admin.findOneBy({_id: req.session.adminId})
     
    }

    @Mutation(() => AdminResponse)
    async changePassword(
        @Arg('token') token: string, 
        @Arg('newPassword') newPassword: string, 
        @Ctx() {redis, req}: MyContext)
        {
    
        if (newPassword.length < 2) {
            return {errors: [
                {
                    field: "newPassword",
                    message: "lenght must be greater then 2"
                }
            ]}
        }

        const key = FORGET_PASSWORD_PREFIX+token

        const adminId = await redis.get(key)

        if (!adminId) {
          return { errors: [{
                field: "token",
                message: "token expired"

            }]}
        }
        
       const _id = parseInt(adminId);
        const admin = await Admin.findOneBy({_id})

        if (!admin) {
            return { errors: [{
                field: "token",
                message: "user no longer exist"

            }]}
        }

        await Admin.update({_id}, {password:await argon2.hash(newPassword)})

        req.session.adminId = parseInt(adminId);
        await redis.del(key)

        return {admin:admin}
        }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string, 
        @Ctx() {redis}: MyContext)
        {
        const admin = await Admin.findOneBy({email})
        if (!admin) {
            return true;
            
        }
        const token = v4()

        await redis.set(FORGET_PASSWORD_PREFIX + token, admin._id, "EX", 1000*60*60*24*3) // 3 DAYS
        sendEmail(email, 
            `<a href= "http://localhost:3000/change-password/${token}"> reset password </a>`)
        return true;
        }
    

    @Mutation(() => AdminResponse)
    async register(
    @Arg('options') options: EmailAndPassword, 
    @Ctx() {req}: MyContext): Promise<AdminResponse>
     {
        if (options.email.length <= 2) {
            return {errors: [{
                field: "email",
                message: "invalid email"
            }]}
        }
        if (options.password.length <= 2) {
            return {errors: [{
                field: "password",
                message: "invalid password"
            }]}
        }
        const hashedPassword = await argon2.hash(options.password);
        let admin;
        try {
           const result = await dataSource
                .createQueryBuilder()
                .insert()
                .into(Admin)
                .values([
                    {email: options.email, password: hashedPassword },    
                ]).returning("*")
                .execute()
            console.log("result", result);
            admin = result.raw
        } catch (error) {
            console.log("ERR", error)
            if(error.code === "23505" || error.detail.includes["already exists"]){
                return {errors: [{
                    field: "email",
                    message: "email already exists"
                }]}
            }
            return {errors: [{
                field: "email",
                message: error.detail
            }]}
        }
        req.session.adminId = admin._id;
            return {admin:admin};
        
    } 

    @Mutation(() => AdminResponse)
    async login(
    @Arg('options') options: EmailAndPassword, 
    @Ctx() {req}: MyContext): Promise<AdminResponse>
     {
        const admin = await Admin.findOneBy({email: options.email})
        if (!admin) {
            return {errors: [{
                field: "email",
                message: "email doesn't exist"
            }]}
        }
        const valid = await argon2.verify(admin.password, options.password);
        if (!valid) {
            return {errors: [{
                field: "password",
                message: "incorrect password"
            }]}
        }
        req.session.adminId = admin._id;
        return {admin: admin};
    }

    @Mutation(() => Boolean)
    logout(
    @Ctx() {req, res}: MyContext)
     {
      return new Promise(resolve => req.session.destroy(err => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
            console.log(err)
            resolve(false)
            return
        }
        else {resolve(true)}
       }))  
    }
}