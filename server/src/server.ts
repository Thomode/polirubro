import { PrismaClient } from "@prisma/client"
import express, { Express, Request, Response } from "express"
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { routes } from "./routes";
import { runSwaggerAutogen } from "./swagger";

export const prisma: PrismaClient = new PrismaClient()

const PORT = 3000
const HOSTNAME = `http://localhost`

const app: Express = express()

async function main() {
    await runSwaggerAutogen()

    // Middlewares
    app.use(express.json())

    // Routes
    app.use("/", routes)
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

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

