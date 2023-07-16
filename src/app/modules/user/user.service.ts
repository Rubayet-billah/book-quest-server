import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "./user.model";
import bcrypt from "bcrypt";

const createUser = async (userData: IUser) => {
  try {
    const { email, password } = userData;

    const isUserExist = await User.findOne({ email: email });

    if (isUserExist) {
      throw Error("User already exist");
    }

    const result = await User.create(userData);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (loginData: Partial<IUser>) => {
  const { email, password: givenPassword } = loginData;

  const isUserExist = await User.findOne({ email: email });
  if (isUserExist) {
    const { password: savedPassword } = isUserExist;
    if (await bcrypt.compare(givenPassword as string, savedPassword)) {
      return isUserExist;
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
