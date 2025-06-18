import express from "express";
import {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(checkAuthorization, getBooksController)
  .post(createBookController);

bookRouter
  .route("/:id")
  .put(updateBookController)
  .delete(checkAuthorization, deleteBookController);

export default bookRouter;
