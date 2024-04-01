import { Category } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../db";
import { StatusCodes } from "http-status-codes";
import { ResponseStatusException } from "../errors/ResponseStatusException";
import { CreateCategoryBodyType, UpdateCategoryBodyType } from "../schemas/category.schema";

export class CategoryController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories: Category[] = await prisma.category.findMany()

            res.status(StatusCodes.OK).json(categories)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const category: Category = await prisma.category.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (!category) {
                throw new ResponseStatusException({ statusCode: StatusCodes.NOT_FOUND, message: "Category not found" })
            }

            res.status(StatusCodes.OK).json(category)

        } catch (error) {
            next(error)
        }
    }

    static async create(
        req: Request<unknown, unknown, CreateCategoryBodyType> & any,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name } = req.body

            const category: Category = await prisma.category.create({
                data: {
                    name: name,
                    userId: req.user.id
                }
            })

            res.status(StatusCodes.CREATED).json(category)

        } catch (error) {
            next(error)
        }
    }

    static async update(
        req: Request<unknown, unknown, UpdateCategoryBodyType> & any,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params
            const { name } = req.body

            const categoryFound: Category = await prisma.category.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (!categoryFound) {
                throw new ResponseStatusException({ statusCode: StatusCodes.NOT_FOUND, message: "Category not found" })
            }

            const category: Category = await prisma.category.update({
                data: {
                    name: name
                },
                where: {
                    id: parseInt(id)
                }
            })

            res.status(StatusCodes.OK).json(category)

        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const categoryFound: Category = await prisma.category.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if (!categoryFound) {
                throw new ResponseStatusException({ statusCode: StatusCodes.NOT_FOUND, message: "Category not found" })
            }

            await prisma.category.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return res.status(StatusCodes.NO_CONTENT).json({
                message: "Product deleted"
            })

        } catch (error) {
            next(error)
        }
    }
}