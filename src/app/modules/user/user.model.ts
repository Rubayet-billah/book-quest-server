import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
