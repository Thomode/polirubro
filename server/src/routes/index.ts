import { Router } from "express"
import { productRouter } from "./product.route"

export const routes = Router()

routes.use("/products", productRouter)