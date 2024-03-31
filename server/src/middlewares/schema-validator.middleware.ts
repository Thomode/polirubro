import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { CustomRequest } from "../interfaces/custom-request.interface";

export const schemaValition = (schema: AnyZodObject) =>
    (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            })

            next()

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json(
                    error.issues.map((issue) => ({
                        path: issue.path,
                        message: issue.message,
                    }))
                )
            }
            return res.status(500).json({ message: "internal server error" });
        }
    }