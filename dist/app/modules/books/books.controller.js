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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const books_service_1 = require("./books.service");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const result = yield books_service_1.bookService.createBook(book);
        res.send({
            status: "success",
            message: "Book created successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield books_service_1.bookService.getAllBooks();
        res.send({
            status: "success",
            message: "All books retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const result = yield books_service_1.bookService.getSingleBook(bookId);
        res.send({
            status: "success",
            message: "Book retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const bookData = __rest(req.body, []);
        const result = yield books_service_1.bookService.updateBook(bookId, bookData);
        res.send({
            status: "success",
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const result = yield books_service_1.bookService.deleteBook(bookId);
        res.send({
            status: "success",
            message: "Book deleted successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.bookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
