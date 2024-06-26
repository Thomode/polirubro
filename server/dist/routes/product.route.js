"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const schema_validator_middleware_1 = require("../middlewares/schema-validator.middleware");
const product_schema_1 = require("../schemas/product.schema");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/", product_controller_1.ProductController.getAll);
exports.productRouter.get("/:id", product_controller_1.ProductController.getById);
exports.productRouter.post("/", (0, schema_validator_middleware_1.schemaValition)(product_schema_1.CreateProductSchema), product_controller_1.ProductController.create);
exports.productRouter.put("/:id", (0, schema_validator_middleware_1.schemaValition)(product_schema_1.UpdateProductSchema), product_controller_1.ProductController.update);
exports.productRouter.delete("/:id", product_controller_1.ProductController.delete);
