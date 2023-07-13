import express from "express";
import { bookController } from "./books.controller";

const router = express.Router();

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);

export const bookRoutes = router;
