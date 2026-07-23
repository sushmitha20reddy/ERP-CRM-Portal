import { Router } from "express";
import { dashboardSummary } from "../controllers/dashboard.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/summary",
  authenticateToken,
  dashboardSummary
);

export default router;