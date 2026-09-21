import type { Request, Response } from "express";
import prisma from "../lib/prisma.ts";

export async function getCategories(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        Name: "asc",
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Failed to get categories:", error);

    res.status(500).json({
      message: "Failed to get categories.",
    });
  }
}

export async function getRecipesByCategory(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const categoryId = Number(req.params.id);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      res.status(400).json({
        message: "Invalid category ID.",
      });
      return;
    }

    const category = await prisma.category.findUnique({
      where: {
        CategoryId: categoryId,
      },
      include: {
        RecipeCategories: {
          include: {
            Recipe: {
              include: {
                User: true,
                RecipeCategories: {
                  include: {
                    Category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!category) {
      res.status(404).json({
        message: "Category not found.",
      });
      return;
    }

    const recipes = category.RecipeCategories.map(
      (recipeCategory) => recipeCategory.Recipe
    );

    res.status(200).json({
      category: {
        CategoryId: category.CategoryId,
        Name: category.Name,
        Description: category.Description,
      },
      recipes,
    });
  } catch (error) {
    console.error("Failed to get recipes by category:", error);

    res.status(500).json({
      message: "Failed to get recipes by category.",
    });
  }
}