"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("./CustomError");
class ResponseStatusException extends CustomError_1.CustomError {
    constructor(params) {
        const { statusCode, message, logging } = params || {};
        super(message);
        this._statusCode = statusCode || 5000;
        this._logging = logging || false;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, ResponseStatusException.prototype);
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._statusCode;
    }
    get logging() {
        return this._logging;
    }
}
exports.default = ResponseStatusException;
