import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { schemaValition } from "../middlewares/schema-validator.middleware";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema";

export const authRouter = Router()

authRouter.post("/login", schemaValition(LoginSchema), AuthController.login)
authRouter.post("/register", schemaValition(RegisterSchema), AuthController.register)