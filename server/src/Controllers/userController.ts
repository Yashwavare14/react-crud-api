import { Request, Response } from "express";
import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../Models/userModel.js";

const handleResponse = (res: Response, message: string, status: number, data: any = null) => {
  res.status(status).json({
    status,
    message,
    data
  });
};

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