import { z } from "zod";

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().min(1, "Email is required").email({ message: "Write a correct email"}),
        password: z.string().min(4, "Password too short")
    })
})

export const RegisterSchema = z.object({
    body: z.object({
        email: z.string().min(1, "Email is required").email({ message: "Write a correct email"}),
        password: z.string().min(4, "Password too short"),
        fullname: z.string().min(1)
    })
})