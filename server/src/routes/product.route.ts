import { Router } from "express"
import { ProductController } from "../controllers/product.controller"
import { schemaValition } from "../middlewares/schema-validator.middleware"
import { CreateProductSchema, UpdateProductSchema } from "../schemas/product.schema"

export const productRouter = Router()

productRouter.get("/", ProductController.getAll)
productRouter.get("/:id", ProductController.getById)
productRouter.post("/", schemaValition(CreateProductSchema), ProductController.create)
productRouter.put("/:id", schemaValition(UpdateProductSchema), ProductController.update)
productRouter.delete("/:id", ProductController.delete)

