"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductSchema = exports.CreateProductSchema = void 0;
const zod_1 = require("zod");
exports.CreateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        description: zod_1.z.string().min(1),
        price: zod_1.z.number().min(1).nonnegative(),
        quantityStock: zod_1.z.number().min(1).nonnegative(),
        categoryId: zod_1.z.number().min(1)
    })
});
exports.UpdateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().nonnegative().optional(),
        quantityStock: zod_1.z.number().nonnegative().optional(),
        categoryId: zod_1.z.number().optional()
    }),
    params: zod_1.z.object({
        id: zod_1.z.number().min(1)
    })
});
