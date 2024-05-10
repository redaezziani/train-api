import {compare, hash,} from 'bcrypt'
import {Request,Response,} from 'express'
import db from '../db'
import secrets from '../secrets'
import { ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput, forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from '../lib/types/auth'
import session from 'express-session'
import  {
    sign,
    verify,
} from 'jsonwebtoken'
import { createForgotPasswordToken, extractToken, randomNumber } from '../services/create-token'
import { sendFogotPasswordEmail } from '../services/send-email'


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
            return res.status(400).json({error: result.error.errors[0].message,status: 'error',})
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
                error: result.error.errors[0].message,
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




export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const {email} = req.body as ForgotPasswordInput
        if (!email) {
            return res.status(400).json({
                error: 'Email is required',
                status: 'error',
            })
        }

        const result = await forgotPasswordSchema.safeParseAsync({
            email,
        })

        if (!result.success) {
            return res.status(400).json({
                error: result.error.errors[0].message,
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
        // Send email with password reset link

        const secret =  randomNumber()
        const token = await createForgotPasswordToken(email, secret)
        // Send email with password reset link
        const send = await sendFogotPasswordEmail(token)
        if (send.status === 'error') {
            return res.status(400).json({
                error: 'Email not sent',
                status: 'error',
            })
        }
        const resetPasswordToken = await db.resetPassword.create({
            data: {
                email,
                secret,
            },
        })
        if (!resetPasswordToken) {
            return res.status(400).json({
                error: 'Token not created, try again',
                status: 'error',
            })
        }
        res.status(200).json({
            status: 'success',
            message : 'Email sent check your inbox , or spam folder',
        })
    } catch (error) {
        
    }
}





export const resetPassword = async (req: Request, res: Response) => {
    try {
        const {token,password} = req.body 
        if (!token || !password) {
            return res.status(400).json({
                error: 'Token and password are required',
                status: 'error',
            })
        }
        const data = extractToken(token)
        if (!data) {
            return res.status(400).json({
                error: 'Invalid token',
                status: 'error',
            })
        }
        const {email,secret} = data
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

        const result = await resetPasswordSchema.safeParseAsync({
            password,
        })
        if (!result.success) {
            return res.status(400).json({
                error: result.error.errors[0].message,
                status: 'error',
            })
        }

        const resetPasswordToken = await db.resetPassword.findFirst({
            where: {
                email,
                secret,
            },
        })

        if (!resetPasswordToken) {
            return res.status(400).json({
                error: 'Token not found',
                status: 'error',
            })
        }
        const hashedPassword = await hash(password, 10)
        await db.users.update({
            where: {
                email,
            },
            data: {
                password: hashedPassword,
            },
        })
        res.status(200).json({
            status: 'success',
            message: 'Password reset successfully',
        })


    } catch (error) {
        console.error(error)
    }
}
