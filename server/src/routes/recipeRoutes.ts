import { Router } from "express";

import {
  createRecipe,
  getRecipes,
  getRecipeById,
} from "../controllers/recipeController.ts";
import { requireAuth } from "../middleware/requireAuth.ts";

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", requireAuth, createRecipe);

export default router;