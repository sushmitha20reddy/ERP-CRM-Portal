import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  addFollowUp,
  getCustomerFollowUps,
  editFollowUp,
  removeFollowUp,
} from "../controllers/followup.controller.js";

const router = Router();

// Get all follow-ups for a customer
router.get(
  "/customer/:customerId",
  authenticateToken,
  authorizeRoles("ADMIN", "SALES", "ACCOUNTS"),
  getCustomerFollowUps
);

// Add follow-up
router.post(
  "/customer/:customerId",
  authenticateToken,
  authorizeRoles("ADMIN", "SALES"),
  addFollowUp
);

// Update follow-up
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN", "SALES"),
  editFollowUp
);

// Delete follow-up
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  removeFollowUp
);

export default router;