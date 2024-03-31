import { Product } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
import { CustomRequest } from "../interfaces/custom-request.interface";
import { CreateProductType } from "../schemas/product.schema";
import ResponseStatusException from "../errors/ResponseStatusException";
import { StatusCodes } from "http-status-codes";

export class ProductController {
    static async getAll(req: CustomRequest, res: Response) {
        try {
            const products: Product[] = await prisma.product.findMany()

            return res.status(200).json(products)

        } catch (error) {
            res.status(500).json({ error })
        }
    }

    static async getById(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const product: Product = await prisma.product.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (!product) {
                throw new ResponseStatusException({statusCode: StatusCodes.NOT_FOUND, message: "Product not found"})
            }

            return res.status(StatusCodes.OK).json(product)

        } catch (error) {
            next(error)
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

    static async update(req: CustomRequest, res: Response) {
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

    static async delete(req: CustomRequest, res: Response) {
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