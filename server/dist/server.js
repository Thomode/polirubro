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
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
const index_1 = require("./routes/index");
exports.prisma = new client_1.PrismaClient();
const PORT = 3000;
const HOST = `http://localhost:${PORT}`;
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Middlewares
        app.use(express_1.default.json());
        // Routes
        app.use("/api", index_1.routes);
        app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
        // Catch unregistered routes
        app.all("*", (req, res) => {
            res.status(404).json({
                error: `Route ${req.originalUrl} not found`
            });
        });
        // Server running
        app.listen(PORT, () => {
            console.log(`\nServer running on: ${HOST}\n`);
            console.log(`\nSwagger-UI running on: ${HOST}/docs\n`);
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$connect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(e);
    yield exports.prisma.$disconnect();
}));
