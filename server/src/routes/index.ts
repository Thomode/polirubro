import express from "express"
import { productRouter } from "./product.route"

export const routes = express.Router()

routes.use("/products", productRouter)