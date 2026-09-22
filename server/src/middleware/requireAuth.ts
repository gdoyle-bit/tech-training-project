import type {
  NextFunction,
  Request,
  Response,
} from "express";
import { getAuth } from "@clerk/express";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const auth = getAuth(req);

  if (!auth.userId) {
    res.status(401).json({
      message: "Authentication required.",
    });
    return;
  }

  next();
}