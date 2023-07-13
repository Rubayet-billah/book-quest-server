import { IBook } from "./books.interface";
import Book from "./books.model";

const createBook = async (book: IBook) => {
  try {
    const result = await Book.create(book);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const bookService = {
  createBook,
};
