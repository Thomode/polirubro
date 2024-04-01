import { Product } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
import { CustomRequest } from "../interfaces/custom-request.interface";
import { StatusCodes } from "http-status-codes";
import { CreateProductType } from "../schemas/product.schema";
import { ResponseStatusException } from "../errors/ResponseStatusException";

export class ProductController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const products: Product[] = await prisma.product.findMany({
                include: {
                    category: true,
                    user: true
                }
            })

            return res.status(StatusCodes.OK).json(products)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const productFound: Product = await prisma.product.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (!productFound) {
                throw new ResponseStatusException({ statusCode: StatusCodes.NOT_FOUND, message: "Product not found" })
            }

            return res.status(StatusCodes.OK).json(productFound)

        } catch (error) {
            next(error)
        }
    }

    static async create(
        req: Request<unknown, unknown, CreateProductType> & any,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {name, description, price, quantityStock, categoryId} = req.body
            
            const productCreated: Product = await prisma.product.create({
                data: {
                    name,
                    description,
                    price, 
                    quantityStock,
                    image: "",
                    categoryId: categoryId,
                    userId: req.user.id
                }
            })

            res.status(200).json(productCreated)
            
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const product = req.body

            const productFound: Product = await prisma.product.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (!productFound) {
                throw new ResponseStatusException({ statusCode: StatusCodes.NOT_FOUND, message: "Product not found" })
            }

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
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const productFound: Product = await prisma.product.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (!productFound) {
                throw new ResponseStatusException({ statusCode: StatusCodes.NOT_FOUND, message: "Product not found" })
            }

            await prisma.product.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return res.status(204).json({
                message: "Product deleted"
            })

        } catch (error) {
            next(error)
        }
    }
}