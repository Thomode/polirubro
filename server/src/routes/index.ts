import { Router } from "express"
import { productRouter } from "./product.route"
import { authRouter } from "./auth.route"
import { auth } from "../middlewares/auth.middleware"
import { categoryRouter } from "./category.route"

export const routes = Router()

routes.use("/categories", auth, categoryRouter)
routes.use("/products", auth, productRouter)
routes.use("/auth", authRouter)