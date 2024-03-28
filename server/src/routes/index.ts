import { Router } from "express"
import { productRouter } from "./product.route"
import { authRouter } from "./auth.route"
import { validateToken } from "../middlewares/validate-token.middleware"

export const routes = Router()

routes.use("/products", validateToken, productRouter)
routes.use("/auth", authRouter)