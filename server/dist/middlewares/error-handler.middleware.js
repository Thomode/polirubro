"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../errors/CustomError");
const errorHandler = (error, req, res, next) => {
    // Handled errors
    if (error instanceof CustomError_1.CustomError) {
        const { statusCode, errors, logging } = error;
        if (logging) {
            console.error(JSON.stringify({
                code: error.statusCode,
                errors: error.errors,
                stack: error.stack,
            }, null, 2));
        }
        return res.status(statusCode).send({ errors });
    }
    // Unhandled errors
    console.error(JSON.stringify(error, null, 2));
    return res.status(500).send({
        errors: [{ message: "Something went wrong" }]
    });
};
exports.errorHandler = errorHandler;
