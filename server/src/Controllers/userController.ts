import { Request, Response } from "express";
import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService, getUserByEmailService, verifyPassword } from "../Services/userModel.js";
import { signToken, verifyToken } from "../utils/jwt.js";
import pool from "../Config/db.js";

const handleResponse = (res: Response, message: string, status: number, data: any = null) => {
  res.status(status).json({
    status,
    message,
    data
  });
};

export const register = async (req: Request, res: Response, next: any) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await getUserByEmailService(email);
    if (existingUser) {
      return handleResponse(res, "User already exists with this email", 409);
    }

    //const abcuser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at", [name, email, password]);
    //console.log("abcuser", abcuser.rows[0]);

    // Create new user with password
    const newUser = await createUserService(name, email, password);
    
    // Generate JWT token
    const token = signToken({
      userId: newUser.id,
      email: newUser.email
    });

    handleResponse(res, "User registered successfully", 201, {
      user: newUser,
      token
    });
  } catch (error) {
    next(error);
  }
}

export const login = async (req: Request, res: Response, next: any) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await getUserByEmailService(email);
    if (!user) {
      return handleResponse(res, "Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return handleResponse(res, "Invalid email or password", 401);
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    handleResponse(res, "Login successful", 200, {
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    next(error);
  }
}

export const getAllUsers = async (req: Request, res: Response, next: any) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, "Users retrieved successfully", 200, users);
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req: Request, res: Response, next: any) => {
    const id = Number(req.params.id);
    // Logic to get user by ID
    try {
        const user = await getUserByIdService(id);
        handleResponse(res, "User retrieved successfully", 200, user);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: any) => {
    const { name, email } = req.body;
    // Logic to create user
    try {
        const newUser = await createUserService(name, email);
        handleResponse(res, "User created successfully", 201, newUser);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response, next: any) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    try {
        const updatedUser = await updateUserService(id, name, email);
        handleResponse(res, "User updated successfully", 200, updatedUser);
    } catch (error) {
        next(error);   
    }
}

export const deleteUser = async (req: Request, res: Response, next: any) => {
    const id = Number(req.params.id);
    try {
        const deletedUser = await deleteUserService(id);
        handleResponse(res, "User deleted successfully", 204, deletedUser);
    } catch (error) {
        next(error);
    }
}