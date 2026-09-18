import type { Request, Response } from "express";
import prisma from "../lib/prisma.ts";

export async function getRecipes(
  req: Request,
  res: Response
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