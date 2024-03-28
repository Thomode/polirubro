import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../server";

export class ProductController {
    static async getAll(req: Request, res: Response) {
        const products: Product[] = await prisma.product.findMany()

        return res.status(200).json(products)
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params

        const product: Product = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            })
        }

        return res.status(200).json(product)
    }

    static async create(req: Request, res: Response) {

    }

    static async update(req: Request, res: Response) {

    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            await prisma.product.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return res.status(204).json({
                message: "Product deleted"
            })

        } catch (error) {
            res.status(500).json({ error })
        }

    }
}