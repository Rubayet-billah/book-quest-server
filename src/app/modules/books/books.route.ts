import express from "express";
import { bookController } from "./books.controller";

const router = express.Router();

router.post("/", bookController.createBook);
router.get("/:id", bookController.getSingleBook);
router.patch("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.get("/", bookController.getAllBooks);

export const bookRoutes = router;
