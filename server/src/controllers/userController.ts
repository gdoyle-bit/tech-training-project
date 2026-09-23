import type { Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";

import prisma from "../lib/prisma.ts";

export async function getCurrentUser(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      res.status(401).json({
        message: "Not authenticated.",
      });
      return;
    }

    const clerkUser = await clerkClient.users.getUser(auth.userId);

    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId,
    );

    if (!primaryEmail) {
      res.status(400).json({
        message: "Authenticated user does not have an email address.",
      });
      return;
    }

    const user = await prisma.user.upsert({
      where: {
        ClerkId: auth.userId,
      },
      update: {
        Email: primaryEmail.emailAddress,
        FirstName: clerkUser.firstName,
        LastName: clerkUser.lastName,
        LastActivityAt: new Date(),
      },
      create: {
        ClerkId: auth.userId,
        Email: primaryEmail.emailAddress,
        FirstName: clerkUser.firstName,
        LastName: clerkUser.lastName,
        LastActivityAt: new Date(),
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to get current user:", error);

    res.status(500).json({
      message: "Failed to get current user.",
    });
  }
}

export async function getCurrentUserRecipes(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      res.status(401).json({
        message: "Not authenticated.",
      });
      return;
    }

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

    const recipes = await prisma.recipe.findMany({
      where: {
        UserId: user.UserId,
      },
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
    console.error("Failed to get current user recipes:", error);

    res.status(500).json({
      message: "Failed to get user recipes.",
    });
  }
}