import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     tags:
 *       - Authentication
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 */
router.post("/login", login);

export default router;