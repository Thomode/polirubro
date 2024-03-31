import { z } from "zod";

export const CreateProductSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        price: z.number().min(1).nonnegative(),
        quantityStock: z.number().min(1).nonnegative(),
        categoryId: z.number().min(1)
    })
})

export type CreateProductType = z.infer<typeof CreateProductSchema>["body"]

export const UpdateProductSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().nonnegative().optional(),
        quantityStock: z.number().nonnegative().optional(),
        categoryId: z.number().optional()
    }),
    params: z.object({
        id: z.number().min(1)
    })
})

export type UpdateProductBodyType = z.infer<typeof UpdateProductSchema>["body"]
export type UpdateProductParamsType = z.infer<typeof UpdateProductSchema>["params"]