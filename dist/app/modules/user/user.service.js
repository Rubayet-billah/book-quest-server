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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const isUserExist = yield user_model_1.default.findOne({ email: email });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User already exists");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(email);
    const user = yield user_model_1.default.create(userData);
    return { user, accessToken };
});
const loginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: givenEmail, password: givenPassword } = loginData;
    const isUserExist = yield user_model_1.default.findOne({ email: givenEmail });
    if (isUserExist) {
        const { email, password: savedPassword } = isUserExist;
        const accessToken = jwtHelpers_1.jwtHelpers.createToken(email);
        console.log(givenPassword);
        if (yield bcrypt_1.default.compare(givenPassword, savedPassword)) {
            return { user: isUserExist, accessToken };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Wrong password");
        }
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
});
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.default.findOne({ email }, { email: 1, wishlist: 1 });
    if (isUserExist) {
        return isUserExist;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
});
const wishlistBook = (userEmail, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by their ID
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Check if the book already exists in the user's wishlist
    if (user.wishlist && user.wishlist.includes(bookId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book already exists in wishlist");
    }
    // Add the book ID to the user's wishlist array
    if (user.wishlist) {
        user.wishlist.push(bookId);
    }
    else {
        user.wishlist = [bookId];
    }
    // Save the updated user with the new book added to the wishlist
    yield user.save();
    return user;
});
exports.userService = {
    createUser,
    loginUser,
    getUser,
    wishlistBook,
};
