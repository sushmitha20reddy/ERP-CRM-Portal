import { Router } from "express";
import { createChallan, getChallans, cancelChallanById, } from "../controllers/challan.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
const router = Router();
router.get("/", authenticateToken, authorizeRoles("ADMIN", "SALES", "WAREHOUSE", "ACCOUNTS"), getChallans);
router.post("/", authenticateToken, authorizeRoles("ADMIN", "SALES"), createChallan);
router.patch("/:id/cancel", authenticateToken, authorizeRoles("ADMIN", "SALES"), cancelChallanById);
export default router;
