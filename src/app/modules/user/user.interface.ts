import mongoose from "mongoose";

export interface IUser {
  name?: string;
  email: string;
  password: string;
  wishlist?: mongoose.Types.Array<mongoose.Types.ObjectId>;
}
