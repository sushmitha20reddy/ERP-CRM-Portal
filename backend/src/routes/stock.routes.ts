import { Router } from "express";
import {
  getStockMovements,
  addStockMovement,
} from "../controllers/stock.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN", "WAREHOUSE", "SALES", "ACCOUNTS"),
  getStockMovements
);
router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN", "WAREHOUSE"),
  addStockMovement
);
export default router;