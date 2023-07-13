import express, { Request, Response } from "express";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Define routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
