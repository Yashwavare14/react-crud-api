import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error: any) {
        const errorMessages = error.issues.map((err: any) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: errorMessages,
      });
    }
  };

export default validate;
