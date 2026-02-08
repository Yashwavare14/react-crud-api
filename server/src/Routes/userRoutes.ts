import express from "express";
import { getAllUsers, createUser, getUserById, updateUser, deleteUser, register, login } from "../Controllers/userController.js";
import validate from "../Middlewares/validate.js";
import { createUserSchema, updateUserSchema, userIdParamSchema, registerSchema, loginSchema } from "../validators/user.schema.js";
import { authMiddleware } from "../Middlewares/auth.js";

const router = express.Router();

// Public authentication routes
router.post("/auth/register", validate(registerSchema), register);
router.post("/auth/login", validate(loginSchema), login);

// Protected routes - require authentication
router.get("/user", authMiddleware, getAllUsers);
router.post("/user", authMiddleware, validate(createUserSchema), createUser);
router.get("/user/:id", authMiddleware, validate(userIdParamSchema), getUserById);
router.put("/user/:id", authMiddleware, validate(updateUserSchema), updateUser);
router.delete("/user/:id", authMiddleware, validate(userIdParamSchema), deleteUser);

export default router;