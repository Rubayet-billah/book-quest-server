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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// middlewares parser
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application routes
app.use("/api/v1", routes_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhwsqpg.mongodb.net/book-quest?retryWrites=true&w=majority`);
    });
}
main();
// Define routes
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// error handler middleware
app.use(globalErrorHandler_1.default);
// not found handler
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API not found",
            },
        ],
    });
    next();
}));
