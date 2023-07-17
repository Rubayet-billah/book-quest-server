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
exports.bookService = void 0;
const books_model_1 = __importDefault(require("./books.model"));
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield books_model_1.default.create(book);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield books_model_1.default.find({});
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield books_model_1.default.findById(id);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const updateBook = (id, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield books_model_1.default.findOneAndUpdate({ _id: id }, bookData);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield books_model_1.default.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.bookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
