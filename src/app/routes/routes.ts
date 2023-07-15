import express from "express";
import { bookRoutes } from "../modules/books/books.route";
import { userRoutes } from "../modules/user/user.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/books",
    route: bookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
