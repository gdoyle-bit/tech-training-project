import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";

import prisma from "../lib/prisma.ts";
import type { CreateRecipeRequest } from "../types/recipe.ts";

export async function getRecipes(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        User: true,
        RecipeCategories: {
          include: {
            Category: true,
          },
        },
      },
      orderBy: {
        TimeStamp: "desc",
      },
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Failed to get recipes:", error);

    res.status(500).json({
      message: "Failed to get recipes.",
    });
  }
}

export async function getRecipeById(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const recipeId = Number(req.params.id);

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
      res.status(400).json({
        message: "Invalid recipe ID.",
      });
      return;
    }

    const recipe = await prisma.recipe.findUnique({
      where: {
        RecipeId: recipeId,
      },
      include: {
        User: true,
        Ingredients: {
          orderBy: {
            IngredientOrder: "asc",
          },
        },
        Directions: {
          orderBy: {
            StepNumber: "asc",
          },
        },
        RecipeCategories: {
          include: {
            Category: true,
          },
        },
      },
    });

    if (!recipe) {
      res.status(404).json({
        message: "Recipe not found.",
      });
      return;
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Failed to get recipe:", error);

    res.status(500).json({
      message: "Failed to get recipe.",
    });
  }
}

export async function createRecipe(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      res.status(401).json({
        message: "Authentication required.",
      });
      return;
    }

    const body = req.body as CreateRecipeRequest;

    // Validate the recipe title.
    if (!body.title?.trim()) {
      res.status(400).json({
        message: "Recipe title is required.",
      });
      return;
    }

    // A recipe must contain at least one ingredient.
    if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
      res.status(400).json({
        message: "At least one ingredient is required.",
      });
      return;
    }

    // Every ingredient must have a name.
    if (
      body.ingredients.some(
        (ingredient) => !ingredient.name?.trim(),
      )
    ) {
      res.status(400).json({
        message: "Every ingredient must have a name.",
      });
      return;
    }

    // A recipe must contain at least one direction.
    if (!Array.isArray(body.directions) || body.directions.length === 0) {
      res.status(400).json({
        message: "At least one direction is required.",
      });
      return;
    }

    // Every direction must contain an instruction.
    if (
      body.directions.some(
        (direction) => !direction.instruction?.trim(),
      )
    ) {
      res.status(400).json({
        message: "Every direction must have an instruction.",
      });
      return;
    }

    // categoryIds must always be an array.
    if (!Array.isArray(body.categoryIds)) {
      res.status(400).json({
        message: "Category IDs must be an array.",
      });
      return;
    }

    // Validate numeric recipe fields.
    if (
      (body.prepTime != null && body.prepTime < 0) ||
      (body.cookTime != null && body.cookTime < 0) ||
      (body.servings != null && body.servings < 1)
    ) {
      res.status(400).json({
        message: "Recipe times and servings must be valid positive values.",
      });
      return;
    }

    // Find the local database user associated with the Clerk account.
    const user = await prisma.user.findUnique({
      where: {
        ClerkId: auth.userId,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }

    // Create the recipe and all related records as one transaction.
    const recipe = await prisma.$transaction(async (tx) => {
      const newRecipe = await tx.recipe.create({
        data: {
          UserId: user.UserId,
          Title: body.title.trim(),
          Description: body.description?.trim() || null,
          PrepTime: body.prepTime ?? null,
          CookTime: body.cookTime ?? null,
          Yield: body.servings ?? null,
        },
      });

      await tx.ingredient.createMany({
        data: body.ingredients.map((ingredient, index) => ({
          RecipeId: newRecipe.RecipeId,
          IngredientOrder: index + 1,
          Name: ingredient.name.trim(),
          Quantity: ingredient.quantity ?? null,
          Unit: ingredient.unit?.trim() || null,
          Notes: ingredient.notes?.trim() || null,
        })),
      });

      await tx.direction.createMany({
        data: body.directions.map((direction, index) => ({
          RecipeId: newRecipe.RecipeId,
          StepNumber: index + 1,
          Instruction: direction.instruction.trim(),
        })),
      });

      if (body.categoryIds.length > 0) {
        await tx.recipeCategory.createMany({
          data: body.categoryIds.map((categoryId) => ({
            RecipeId: newRecipe.RecipeId,
            CategoryId: categoryId,
          })),
        });
      }

      return newRecipe;
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("Failed to create recipe:", error);

    res.status(500).json({
      message: "Failed to create recipe.",
    });
  }
}