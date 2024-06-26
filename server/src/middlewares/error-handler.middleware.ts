import { NextFunction, Request, Response } from "express"
import { CustomError } from "../errors/CustomError"

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    // Handled errors
    if (error instanceof CustomError) {
        const { statusCode, errors, logging } = error

        if (logging) {
            console.error(JSON.stringify({
                code: error.statusCode,
                errors: error.errors,
                stack: error.stack,
            }, null, 2))
        }

        return res.status(statusCode).send({ errors })
    }

    // Unhandled errors
    console.error(JSON.stringify(error, null, 2))

    return res.status(500).send({
        errors: [{ message: "Internal Server Error" }]
    });
}