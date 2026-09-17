import "dotenv/config";

import express, {
  type Express,
  type Request,
  type Response,
} from "express";

import cors from "cors";

const app: Express = express();

const port = Number(process.env.PORT) || 3000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientUrl,
  }),
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Recipe Manager API is running!");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});