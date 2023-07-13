import mongoose, { Schema } from "mongoose";
import { IBook, IReview } from "./books.interface";

const reviewSchema = new Schema<IReview>({
  user: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
});

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
