import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body;
    const { user, accessToken } = await userService.createUser(userData);
    res.send({
      status: "success",
      message: "User registered successfully",
      data: { email: user.email, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body;
    const { user, accessToken } = await userService.loginUser(userData);
    res.send({
      status: "success",
      message: "User logged in successfully",
      data: { email: user.email, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

const wishlistBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail, bookId } = req.body; // Assuming you have the user's ID and book's ID in the request body

    // // Check if the book exists in the database
    // const book = await Book.findById(bookId);
    // if (!book) {
    //   return res.status(404).send({ status: "error", message: "Book not found" });
    // }

    // Add the book ID to the user's wishlist array
    const user = await userService.wishlistBook(userEmail, bookId);

    res.send({
      status: "success",
      message: "Book added to wishlist successfully",
      data: { email: user.email, wishlist: user.wishlist },
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
  loginUser,
  wishlistBook,
};
