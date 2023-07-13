import { NextFunction, Request, Response } from "express";
import { bookService } from "./books.service";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = req.body;
    const result = await bookService.createBook(book);
    res.send({
      status: "sccess",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const bookController = { createBook };
