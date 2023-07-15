import User from "./user.model";

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

export const userService = {
  createUser,
};
