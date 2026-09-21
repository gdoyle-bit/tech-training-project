import { Router } from "express";
import { getRecipes } from "../controllers/recipeController.ts";

// console.log("recipeRoutes.ts loaded");

const router = Router();

router.get("/", getRecipes);

// console.log("GET / registered on recipe router");

export default router;