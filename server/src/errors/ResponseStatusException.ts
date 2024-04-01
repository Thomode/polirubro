import { CustomError } from "./CustomError"

export class ResponseStatusException extends CustomError {
    private readonly _statusCode: number
    private readonly _logging: boolean
    private readonly _context: { [key: string]: any }

    constructor(
        params?: { statusCode?: number, message?: string, logging?: boolean, context?: { [key: string]: any } }
    ) {
        const { statusCode, message, logging } = params || {}

        super(message)
        this._statusCode = statusCode || 5000
        this._logging = logging || false
        this._context = params?.context || {}

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, ResponseStatusException.prototype)
    }

    get errors() {
        return [{ message: this.message, context: this._context }]
    }

    get statusCode() {
        return this._statusCode
    }

    get logging() {
        return this._logging
    }
}