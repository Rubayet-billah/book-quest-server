import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./app/routes/routes";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// middlewares parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1", router);

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhwsqpg.mongodb.net/book-quest?retryWrites=true&w=majority`
  );
}

main();

// Define routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
