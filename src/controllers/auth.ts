import {compare, hash,} from 'bcrypt'
import {Request,Response,} from 'express'
import db from '../db'
import secrets from '../secrets'
import { LoginInput, RegisterInput, loginSchema, registerSchema } from '../lib/types/auth'
import session from 'express-session'
import  {
    sign,
    verify,
} from 'jsonwebtoken'


export const register = async (req:any, res: Response) => {
    try {
        const {email,password,name} =  req.body as RegisterInput
        const hashedPassword = await hash(password, 10)
        
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
                status : 'error',
            })
        }

        const result = await registerSchema.safeParseAsync({
            email,
            password,
            name,
        })

        if (!result.success) {
            return res.status(400).json({error: result.error.errors,status: 'error',})
        }
        const isUserExist = await db.users.findUnique({
            where: {
                email,
            },
        })
        if (isUserExist) {
            return res.status(400).json({
                error: 'User already exists',status: 'error'})
        }

        const register = await db.users.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        })
        if (!register) {
            return res.status(400).json({
                error: 'User not created',status: 'error',
            })
        }   
       
        res.status(201).redirect('/')
    } catch (error) {
        console.error(error)
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const {email,password} = await req.body 
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
                status: 'error',
            })
        }

        const result = await loginSchema.safeParseAsync({
            email,
            password,
        })
        if (!result.success) {
            return res.status(400).json({
                error: result.error.errors,
                status: 'error',
            })
        }
        const user = await db.users.findUnique({
            where: {
                email,
            },
        })
        if (!user) {
            return res.status(400).json({
                error: 'User not found',
                status: 'error',
            })
        }
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({
                error: 'Invalid credentials',
                status: 'error',
            })
        }
        const token = sign({
            id: user.id,
            email: user.email,
            picture : user.profile,
            name : user.name,
            role : user.role,
        }, secrets.jwtSecret, {
            expiresIn: secrets.jwtExpiration,
        })
        
        const credentials = req.cookies.credentials
        res.cookie('credentials', token,{
            maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        res.status(200).redirect('/')

    } catch (error) {
        console.error(error)
    }
}

