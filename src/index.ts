import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("working");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
