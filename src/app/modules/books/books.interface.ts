export interface IReview {
  user: string;
  review: string;
}

export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: IReview[];
}
