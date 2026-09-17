-- CreateTable
CREATE TABLE "users" (
    "UserId" SERIAL NOT NULL,
    "ClerkId" VARCHAR(255) NOT NULL,
    "UserName" VARCHAR(45),
    "Email" VARCHAR(255) NOT NULL,
    "FirstName" VARCHAR(45),
    "LastName" VARCHAR(45),
    "IsAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "LastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "recipes" (
    "RecipeId" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "Photo" TEXT,
    "PrepTime" INTEGER,
    "Yield" INTEGER,
    "TimeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Comments" TEXT,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("RecipeId")
);

-- CreateTable
CREATE TABLE "categories" (
    "CategoryId" SERIAL NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Description" VARCHAR(255),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("CategoryId")
);

-- CreateTable
CREATE TABLE "recipe_categories" (
    "RecipeId" INTEGER NOT NULL,
    "CategoryId" INTEGER NOT NULL,

    CONSTRAINT "recipe_categories_pkey" PRIMARY KEY ("RecipeId","CategoryId")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "IngredientId" SERIAL NOT NULL,
    "RecipeId" INTEGER NOT NULL,
    "IngredientOrder" INTEGER NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Quantity" DECIMAL(8,2),
    "Unit" VARCHAR(30),
    "Notes" VARCHAR(255),

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("IngredientId")
);

-- CreateTable
CREATE TABLE "directions" (
    "DirectionId" SERIAL NOT NULL,
    "RecipeId" INTEGER NOT NULL,
    "StepNumber" INTEGER NOT NULL,
    "Instruction" TEXT NOT NULL,

    CONSTRAINT "directions_pkey" PRIMARY KEY ("DirectionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ClerkId_key" ON "users"("ClerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_UserName_key" ON "users"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "users_Email_key" ON "users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_Name_key" ON "categories"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_RecipeId_IngredientOrder_key" ON "ingredients"("RecipeId", "IngredientOrder");

-- CreateIndex
CREATE UNIQUE INDEX "directions_RecipeId_StepNumber_key" ON "directions"("RecipeId", "StepNumber");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_categories" ADD CONSTRAINT "recipe_categories_RecipeId_fkey" FOREIGN KEY ("RecipeId") REFERENCES "recipes"("RecipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_categories" ADD CONSTRAINT "recipe_categories_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "categories"("CategoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_RecipeId_fkey" FOREIGN KEY ("RecipeId") REFERENCES "recipes"("RecipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directions" ADD CONSTRAINT "directions_RecipeId_fkey" FOREIGN KEY ("RecipeId") REFERENCES "recipes"("RecipeId") ON DELETE CASCADE ON UPDATE CASCADE;
