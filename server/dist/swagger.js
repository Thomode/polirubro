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
exports.runSwaggerAutogen = void 0;
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
function runSwaggerAutogen() {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = {
            info: {
                version: 'v1.0.0',
                title: 'Polirubro API',
                description: 'Polirubro'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: ''
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        in: 'header',
                        name: 'Authorization',
                        description: 'Bearer token to access these api endpoints',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ]
        };
        const outputFile = './swagger_output.json';
        const endpointsFiles = ['./src/routes/index.ts'];
        yield (0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
    });
}
exports.runSwaggerAutogen = runSwaggerAutogen;
runSwaggerAutogen();
