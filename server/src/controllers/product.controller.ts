import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../server";

export class ProductController{
    static async getAll(req: Request, res: Response){
        const products: Product[] = await prisma.product.findMany()

        res.status(200).json(products)
    }
}