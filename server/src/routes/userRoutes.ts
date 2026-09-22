import { Router } from "express";

import { getCurrentUser } from "../controllers/userController.ts";
import { requireAuth } from "../middleware/requireAuth.ts";

const router = Router();

router.get("/me", requireAuth, getCurrentUser);

export default router;