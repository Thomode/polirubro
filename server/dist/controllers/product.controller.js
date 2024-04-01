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
exports.ProductController = void 0;
const db_1 = require("../db");
const ResponseStatusException_1 = __importDefault(require("../errors/ResponseStatusException"));
const http_status_codes_1 = require("http-status-codes");
class ProductController {
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield db_1.prisma.product.findMany();
                return res.status(http_status_codes_1.StatusCodes.OK).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield db_1.prisma.product.findUnique({
                    where: {
                        id: parseInt(id)
                    }
                });
                if (!product) {
                    throw new ResponseStatusException_1.default({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: "Product not found" });
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, price, quantityStock, categoryId } = req.body;
                /*
                const productCreated: Product = await prisma.product.create({
                    data: {
                        name,
                        description,
                        price,
                        quantityStock,
                        image: "",
                        userId: req.user.id
                    }
                })
    
                res.status(200).json(productCreated)
                */
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = req.body;
                const productUpdated = yield db_1.prisma.product.update({
                    data: product,
                    where: {
                        id: parseInt(id)
                    },
                    include: {
                        category: true
                    }
                });
                res.status(200).json(productUpdated);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield db_1.prisma.product.delete({
                    where: {
                        id: parseInt(id)
                    }
                });
                return res.status(204).json({
                    message: "Product deleted"
                });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
}
exports.ProductController = ProductController;
