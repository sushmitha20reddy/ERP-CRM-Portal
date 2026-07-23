import { Router } from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
  getLowStock,
} from "../controllers/product.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";


const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN", "SALES", "WAREHOUSE", "ACCOUNTS"),
  getProducts
);

router.get(
  "/low-stock",
  authenticateToken,
  authorizeRoles("ADMIN", "WAREHOUSE", "ACCOUNTS"),
  getLowStock
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN", "SALES", "WAREHOUSE", "ACCOUNTS"),
  getProduct
);
router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN", "WAREHOUSE"),
  addProduct
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN", "WAREHOUSE"),
  editProduct
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  removeProduct
);
export default router;