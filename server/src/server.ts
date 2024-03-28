import { PrismaClient } from "@prisma/client"
import express, { Express, Request, Response } from "express"
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { routes } from "./routes/index";

export const prisma: PrismaClient = new PrismaClient()

const PORT = 3000
const HOST = `http://localhost:${PORT}`

const app: Express = express()

async function main() {
    // Middlewares
    app.use(express.json())

    // Routes
    app.use("/api", routes)
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

    // Catch unregistered routes
    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ 
            error: `Route ${req.originalUrl} not found` 
        })
    })

    // Server running
    app.listen(PORT, () => {
        console.log(`\nServer running on: ${HOST}\n`)
        console.log(`\nSwagger-UI running on: ${HOST}/docs\n`)
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

