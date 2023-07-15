// import { NextFunction, Request, Response } from "express";

// const authLogin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { ...loginData } = req.body;
//     const result = await authService.authLogin(loginData);

//     const { refreshToken, ...rest } = result;

//     // set refresh token into cookie

//     const cookieOptions = {
//       secure: envObj.env === "production",
//       httpOnly: true,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const authController = {
//   authLogin,
// };
