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

export const userService = {
  createUser,
  loginUser,
};
