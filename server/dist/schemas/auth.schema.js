"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().min(1, "Email is required").email({ message: "Write a correct email" }),
        password: zod_1.z.string().min(4, "Password too short")
    })
});
exports.RegisterSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().min(1, "Email is required").email({ message: "Write a correct email" }),
        password: zod_1.z.string().min(4, "Password too short"),
        fullname: zod_1.z.string().min(1)
    })
});
