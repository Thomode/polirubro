import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../db";

export class ProductController {
    static async getAll(req: Request, res: Response) {
        try {
            const products: Product[] = await prisma.product.findMany()

            return res.status(200).json(products)

        } catch (error) {
            res.status(500).json({ error })
        }
    }

    static async getById(req: Request, res: Response) {
        try {
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

        } catch (error) {
            res.status(500).json({ error })
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const product = req.body

            const productCreated: Product = await prisma.product.create({
                data: product
            })

            res.status(200).json(productCreated)
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const product = req.body

            const productUpdated = await prisma.product.update({
                data: product,
                where: {
                    id: parseInt(id)
                },
                include: {
                    category: true
                }
            })

            res.status(200).json(productUpdated)

        } catch (error) {
            res.status(500).json({ error })
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

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