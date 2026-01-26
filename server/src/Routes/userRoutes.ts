import express from "express";
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from "../Controllers/userController.js";
import validate from "../Middlewares/validate.js";
import { createUserSchema, updateUserSchema, userIdParamSchema } from "../validators/user.schema.js";
const router = express.Router();

router.get("/user", getAllUsers);
router.post("/user", validate(createUserSchema), createUser);
router.get("/user/:id", validate(userIdParamSchema), getUserById);
router.put("/user/:id", validate(updateUserSchema), updateUser);
router.delete("/user/:id", validate(userIdParamSchema), deleteUser);

export default router;