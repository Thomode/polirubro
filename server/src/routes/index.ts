import { Router } from "express"
import { productRouter } from "./product.route"
import { authRouter } from "./auth.route"
import { auth } from "../middlewares/validate-token.middleware"

export const routes = Router()

routes.use("/products", auth, productRouter)
routes.use("/auth", authRouter)