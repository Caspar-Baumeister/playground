
import { Admin } from "../entities/Admin";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utiles/sendEmail";
import { v4 } from "uuid";

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
    async me(@Ctx() {req, em}: MyContext) {
        if(!req.session.adminId) {
            return null
        }
        const fork = em.fork();
        const admin = await fork.findOne(Admin, {_id: req.session.adminId})
        return admin
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string, 
        @Ctx() {em, redis}: MyContext)
        {
        const fork = em.fork();
        const admin = await fork.findOne(Admin, {email: email})
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
    @Ctx() {em, req}: MyContext): Promise<AdminResponse>
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
        const fork = em.fork();
        const hashedPassword = await argon2.hash(options.password);
        const admin = fork.create(Admin,{email: options.email, password: hashedPassword})
        try {
            await fork.persistAndFlush(admin)
            
        } catch (error) {
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
    @Ctx() {em, req}: MyContext): Promise<AdminResponse>
     {
        const fork = em.fork();
        const admin = await fork.findOne(Admin, {email: options.email})
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