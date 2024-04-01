import { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../db"
import { User } from "@prisma/client";
import { CustomRequest } from "../interfaces/custom-request.interface";
import { StatusCodes } from "http-status-codes";

export class AuthController {
    static async login(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const userFound: User = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!userFound) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
            }

            const validPassword = await bcrypt.compare(password, userFound.password);

            if (!validPassword) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "Password invalid" })
            }

            const payload = {
                email: userFound.email,
                id: userFound.id
            }

            // create token
            const token: string = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            )

            res.status(StatusCodes.OK).json({ token })

        } catch (error) {
            next(error)
        }
    }

    static async register(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { email, password, fullname } = req.body

            const isEmailExist = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (isEmailExist) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "Email registred" })
            }

            // hash password
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            const userCreated = await prisma.user.create({
                data: {
                    email: email,
                    password: passwordHash,
                    fullname: fullname
                }
            })

            res.status(StatusCodes.CREATED).json(userCreated)

        } catch (error) {
            next(error)
        }
    }
}