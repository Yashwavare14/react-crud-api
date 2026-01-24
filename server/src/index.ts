import dotenv from "dotenv";
dotenv.config();
import express from "express";

import userRoutes from "./Routes/userRoutes.ts";

import pool from "./Config/db.js";
import errorHandler from "./Middlewares/errorHandler.js";
import { createUserTable } from "./data/createUserTable.js";

const app = express();
const port = process.env.PORT || 5001;

//middlewares
app.use(express.json());
app.use(errorHandler);

createUserTable();

app.use("/api", userRoutes);

app.get("/", async (req, res) => {
  console.log("start");
  const result = await pool.query("SELECT current_database()");
  console.log("end");
  res.send(result.rows[0].current_database);
  res.send("Hello TypeScript + Express");
});

app.listen(port, () => {
  console.log("Server running");
});
