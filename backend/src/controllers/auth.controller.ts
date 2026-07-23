import { Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";
import { registerUser, loginUser } from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    // Register user
    const user = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(
      validatedData.email,
      validatedData.password
    );

    return res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}