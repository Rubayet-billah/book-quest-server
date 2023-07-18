import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "./user.model";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const createUser = async (userData: IUser) => {
  const { email } = userData;

  const isUserExist = await User.findOne({ email: email });

  if (isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User already exists");
  }

  const accessToken = jwtHelpers.createToken(email);

  const user = await User.create(userData);

  return { user, accessToken };
};

const loginUser = async (loginData: Partial<IUser>) => {
  const { email: givenEmail, password: givenPassword } = loginData;

  const isUserExist = await User.findOne({ email: givenEmail });
  if (isUserExist) {
    const { email, password: savedPassword } = isUserExist;
    const accessToken = jwtHelpers.createToken(email);
    if (await bcrypt.compare(givenPassword as string, savedPassword)) {
      return { user: isUserExist, accessToken };
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Wrong password");
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
};

const getUser = async (email: string) => {
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return isUserExist;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
};

const wishlistBook = async (userEmail: string, bookId: string) => {
  // Find the user by their ID
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if the book already exists in the user's wishlist
  if (user.wishlist.includes(bookId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book already exists in wishlist"
    );
  }

  // Add the book ID to the user's wishlist array
  user?.wishlist.push(bookId);

  // Save the updated user with the new book added to the wishlist
  await user.save();

  return user;
};

export const userService = {
  createUser,
  loginUser,
  getUser,
  wishlistBook,
};
