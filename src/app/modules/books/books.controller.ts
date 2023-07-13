import { NextFunction, Request, Response } from "express";
import { bookService } from "./books.service";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = req.body;
    const result = await bookService.createBook(book);
    res.send({
      status: "success",
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookService.getAllBooks();
    res.send({
      status: "success",
      message: "All books retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.id;
    const result = await bookService.getSingleBook(bookId);
    res.send({
      status: "success",
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const bookController = { createBook, getAllBooks, getSingleBook };
