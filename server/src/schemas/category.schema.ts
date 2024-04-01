import { z } from "zod";

export const CreateCategorySchema = z.object({
    body: z.object({
        name: z.string().min(4)
    })
})

export type CreateCategoryBodyType = z.infer<typeof CreateCategorySchema>["body"]

export const UpdateCategorySchema = z.object({
    body: z.object({
        name: z.string().min(4)
    }),
    params: z.object({
        id: z.number().min(1)
    })
})

export type UpdateCategoryBodyType = z.infer<typeof UpdateCategorySchema>["body"]
export type UpdateCategoryParamsType = z.infer<typeof UpdateCategorySchema>["params"]