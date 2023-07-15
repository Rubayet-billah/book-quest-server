export interface IReview {
  user: string;
  review: string;
}

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  authorEmail: string;
  price: string;
  genre: string;
  publishYear: string;
  featured: boolean;
  reviews?: IReview[];
}
