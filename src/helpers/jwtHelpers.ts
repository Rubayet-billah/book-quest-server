import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = (userEmail: string) => {
  // Customize the token signing options according to your requirements
  const secretKey = process.env.JWT_SECRET || "default-secret-key";
  const expiresIn = "1h";

  const payload = {
    userEmail: userEmail,
  };

  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
