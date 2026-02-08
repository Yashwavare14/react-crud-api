import pool from "../Config/db.js";
import bcryptjs from "bcryptjs";

// Hash password utility
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

// Verify password utility
export const verifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcryptjs.compare(plainPassword, hashedPassword);
};

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT id, name, email, created_at FROM users");
  return result.rows;
}

export const getUserByIdService = async (id: number) => {
  const result = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

export const getUserByEmailService = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

export const createUserService = async (name: string, email: string, password?: string) => {
  let hashedPassword = null;
  
  if (password) {
    hashedPassword = await hashPassword(password);
  }

  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
    [name, email, hashedPassword]
  );
  return result.rows[0];
}

export const updateUserService = async (id: number, name: string, email: string) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at",
    [name, email, id]
  );
  return result.rows[0];
}

export const deleteUserService = async (id: number) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email, created_at", [id]);
  return result.rows[0];
}