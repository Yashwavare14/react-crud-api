import pool from "../Config/db.js";

export const createUserTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);`;



    try {
        await pool.query(queryText);
        console.log("User table created");

        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS password VARCHAR(255) NOT NULL;
        `);
    } catch (error) {
        console.error("error creating user table", error)
    }
}
