import { Router } from "express";

import { getCurrentUser } from "../controllers/userController.ts";

const router = Router();

router.get("/me", getCurrentUser);

export default router;