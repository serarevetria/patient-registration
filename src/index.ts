import express from "express";
import dotenv from "dotenv";
import { pool } from "./config/db";
import patientRoutes from "./routes/patientRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", patientRoutes);

app.get("/", (_req, res) => {
  res.send("working");
});

const PORT = process.env.PORT || 3001;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectWithRetry(
  fn: () => Promise<any>,
  retries = 5,
  interval = 5000
): Promise<any> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    console.log(`Retrying connection... Attempts remaining: ${retries}`);
    await wait(interval);
    return connectWithRetry(fn, retries - 1, interval);
  }
}

async function initializeDatabase() {
  try {
    await connectWithRetry(async () => {
      console.log("Attempting to connect to database...");
      await pool.query("SELECT 1");
      console.log("Successfully connected to database");
    });

    const [tables] = await pool.query(tableExistsQuery);

    if (Array.isArray(tables) && tables.length === 0) {
      await pool.query(createTableQuery);
      console.log("Table 'patients' created successfully");
    } else {
      console.log("Table 'patients' already exists");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

const tableExistsQuery = `
  SELECT TABLE_NAME 
  FROM information_schema.TABLES 
  WHERE TABLE_SCHEMA = 'patients_db' 
  AND TABLE_NAME = 'patients'
`;

const createTableQuery = `
  CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    photo LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

startServer();
