import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const prisma = new PrismaClient();

const categories = [
  {
    Name: "Breakfast",
    Description: "Recipes typically served for breakfast.",
  },
  {
    Name: "Lunch",
    Description: "Recipes suitable for lunch.",
  },
  {
    Name: "Dinner",
    Description: "Recipes typically served as a main evening meal.",
  },
  {
    Name: "Appetizer",
    Description: "Small dishes served before a main meal.",
  },
  {
    Name: "Dessert",
    Description: "Sweet dishes and treats.",
  },
  {
    Name: "Snack",
    Description: "Small dishes and quick bites.",
  },
  {
    Name: "Vegetarian",
    Description: "Recipes that do not contain meat.",
  },
  {
    Name: "Vegan",
    Description: "Recipes that do not contain animal products.",
  },
];

async function main() {
  // Seed categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        Name: category.Name,
      },
      update: {},
      create: category,
    });
  }

  console.log("Categories seeded successfully.");

  // Create a development user
  const user = await prisma.user.upsert({
    where: {
      ClerkId: "dev_user_alex",
    },
    update: {},
    create: {
      ClerkId: "dev_user_alex",
      UserName: "alex",
      Email: "alex@example.com",
      FirstName: "Alex",
      LastName: "Cook",
    },
  });

  console.log("Development user seeded successfully.");

  // Prevent duplicate development recipes
  const existingRecipe = await prisma.recipe.findFirst({
    where: {
      Title: "Classic Pancakes",
      UserId: user.UserId,
    },
  });

  if (!existingRecipe) {
    const breakfast = await prisma.category.findUnique({
      where: {
        Name: "Breakfast",
      },
    });

    const vegetarian = await prisma.category.findUnique({
      where: {
        Name: "Vegetarian",
      },
    });

    if (!breakfast || !vegetarian) {
      throw new Error("Required categories were not found.");
    }

    await prisma.recipe.create({
      data: {
        UserId: user.UserId,
        Title: "Classic Pancakes",
        PrepTime: 20,
        Yield: 4,
        Comments: "Simple fluffy pancakes for breakfast.",

        Ingredients: {
          create: [
            {
              IngredientOrder: 1,
              Name: "All-purpose flour",
              Quantity: 2,
              Unit: "cups",
            },
            {
              IngredientOrder: 2,
              Name: "Baking powder",
              Quantity: 2,
              Unit: "tsp",
            },
            {
              IngredientOrder: 3,
              Name: "Milk",
              Quantity: 1.5,
              Unit: "cups",
            },
            {
              IngredientOrder: 4,
              Name: "Eggs",
              Quantity: 2,
            },
          ],
        },

        Directions: {
          create: [
            {
              StepNumber: 1,
              Instruction:
                "Combine the flour and baking powder in a large bowl.",
            },
            {
              StepNumber: 2,
              Instruction:
                "Whisk the milk and eggs together in a separate bowl.",
            },
            {
              StepNumber: 3,
              Instruction:
                "Add the wet ingredients to the dry ingredients and mix until combined.",
            },
            {
              StepNumber: 4,
              Instruction:
                "Cook the pancakes on a lightly greased skillet until golden brown.",
            },
          ],
        },

        RecipeCategories: {
          create: [
            {
              CategoryId: breakfast.CategoryId,
            },
            {
              CategoryId: vegetarian.CategoryId,
            },
          ],
        },
      },
    });

    console.log("Classic Pancakes recipe seeded successfully.");
  } else {
    console.log("Classic Pancakes already exists. Skipping.");
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });