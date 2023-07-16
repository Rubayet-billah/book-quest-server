import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body;
    const result = await userService.createUser(userData);
    res.send({
      status: "success",
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body;
    const result = await userService.loginUser(userData);
    res.send({
      status: "success",
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
  loginUser,
};
