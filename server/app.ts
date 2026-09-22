import "dotenv/config";

import express, {
  type Express,
  type Request,
  type Response,
} from "express";
import cors from "cors";

import recipeRoutes from "./src/routes/recipeRoutes.ts";
import categoryRoutes from "./src/routes/categoryRoutes.ts";
import userRoutes from "./src/routes/userRoutes.ts";
import {clerkMiddleware} from "@clerk/express";

const app: Express = express();

const port = Number(process.env.PORT) || 3000;
const clientUrl =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientUrl,
  }),
);

app.use(express.json());

app.use(clerkMiddleware());

app.use("/api/recipes", recipeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Recipe Manager API is running!");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});