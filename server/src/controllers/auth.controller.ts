import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../db"
import { User } from "@prisma/client";
import dotenv from "dotenv"

dotenv.config()

export class AuthController {
    static async login(req: Request, res: Response) {
        const userFound: User = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        if (!userFound) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(req.body.password, userFound.password);

        if (!validPassword) {
            return res.status(403).json({ error: "Password invalid" })
        }

        // create token
        const token: string = jwt.sign({
            email: userFound.email,
            id: userFound.id
        }, process.env.TOKEN_SECRET)

        res.header('Authorization', token).json({token})

    }

    static async register(req: Request, res: Response) {
        const isEmailExist = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        if (isEmailExist) {
            return res.status(400).json({ error: 'Email registred' })
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        try {
            const userCreated = await prisma.user.create({
                data: {
                    email: req.body.email,
                    password: password,
                    fullname: req.body.fullname
                }
            })

            res.status(200).json(userCreated)

        } catch (error) {
            res.status(500).json({ error })
        }
    }
}