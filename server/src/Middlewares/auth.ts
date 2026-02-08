import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Missing or invalid authorization header",
        data: null
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify token
    const decoded = verifyToken(token);
    
    // Attach user payload to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        message: "Token has expired",
        data: null
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: 401,
        message: "Invalid token",
        data: null
      });
    }

    res.status(401).json({
      status: 401,
      message: "Authentication failed",
      data: null
    });
  }
};
