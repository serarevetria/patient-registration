import express from "express";
import dotenv from "dotenv";
import { pool } from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  testDB();
  res.send("working");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});

async function testDB() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("connected with db", rows);
  } catch (error) {
    console.error("error with db:", error);
  }
}
