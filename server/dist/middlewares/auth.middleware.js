"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Access denied. Bearer token missing." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const userVerified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;
        next();
    }
    catch (error) {
        res.status(400).json({ error: "Token is invalid" });
    }
}
exports.auth = auth;
