import express, { Application, Request, Response } from "express"
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { routes } from "./routes";
import cors from "cors"
import dotenv from "dotenv"
import { prisma } from "./db";
import { errorHandler } from "./middlewares/error-handler.middleware";

dotenv.config()

const PORT: number = Number(process.env.SERVER_PORT) || 8080
const HOSTNAME: string = `http://localhost`

async function main() {
    const app: Application = express()

    // Middlewares
    app.use(cors())
    app.use(express.json())

    // Routes
    app.use("/", routes)
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

    app.use(errorHandler)

    // Catch unregistered routes
    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({
            error: `Route ${req.originalUrl} not found`
        })
    })

    // Server running
    app.listen(PORT, () => {
        console.log(`\nServer running on: ${HOSTNAME}:${PORT}`)
        console.log(`\nSwagger-UI running on: ${HOSTNAME}:${PORT}/docs\n`)
    })
}

main()
    .then(async () => {
        await prisma.$connect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
    })

