import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function validateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']

    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: "Access denied. Bearer token missing." })
    }

    const token = authHeader.split(' ')[1]

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        //req.email = verified

        next()

    } catch (error) {
        res.status(400).json({error: "Token is invalid"})
    }
}