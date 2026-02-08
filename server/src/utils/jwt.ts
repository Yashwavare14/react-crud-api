import jwt from "jsonwebtoken";
//import { JwtPayload } from "../types/auth.types";

interface JwtPayload {
  userId: number;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
