import express, { Request, Response } from "express"
import { ProductController } from "../controllers/product.controller"
import { prisma } from "../server"
import { Product } from "@prisma/client"

export const productRouter = express.Router()

productRouter.get("", async (req: Request, res: Response) => {
    const products: Product[] = await prisma.product.findMany()

    res.status(200).json(products)
})

