"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const http_status_codes_1 = require("http-status-codes");
class AuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userFound = yield db_1.prisma.user.findUnique({
                    where: {
                        email: email
                    }
                });
                if (!userFound) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'User not found' });
                }
                const validPassword = yield bcrypt_1.default.compare(password, userFound.password);
                if (!validPassword) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "Password invalid" });
                }
                const payload = {
                    email: userFound.email,
                    id: userFound.id
                };
                // create token
                const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
                res.status(http_status_codes_1.StatusCodes.OK).json({ token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, fullname } = req.body;
                const isEmailExist = yield db_1.prisma.user.findUnique({
                    where: {
                        email: email
                    }
                });
                if (isEmailExist) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "Email registred" });
                }
                // hash password
                const salt = yield bcrypt_1.default.genSalt(10);
                const passwordHash = yield bcrypt_1.default.hash(password, salt);
                const userCreated = yield db_1.prisma.user.create({
                    data: {
                        email: email,
                        password: passwordHash,
                        fullname: fullname
                    }
                });
                res.status(http_status_codes_1.StatusCodes.CREATED).json(userCreated);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
