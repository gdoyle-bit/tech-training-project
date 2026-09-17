import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";

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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });