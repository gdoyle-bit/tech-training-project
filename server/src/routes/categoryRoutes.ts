import { Router } from "express";
import {
  getCategories,
  getRecipesByCategory,
} from "../controllers/categoryController.ts";

const router = Router();

router.get("/", getCategories);
router.get("/:id/recipes", getRecipesByCategory);

export default router;