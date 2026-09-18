import "dotenv/config";

// console.log("1. Starting app.ts");

import express, {
  type Express,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import recipeRoutes from "./src/routes/recipeRoutes.ts";

// console.log("2. Imports loaded");

const app: Express = express();

// console.log("3. Express created");

const port = Number(process.env.PORT) || 3000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientUrl,
  }),
);

app.use(express.json());

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Test route works" });
});

app.use("/api/recipes", recipeRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Recipe Manager API is running!");
});

// console.log("4. About to start server");

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});