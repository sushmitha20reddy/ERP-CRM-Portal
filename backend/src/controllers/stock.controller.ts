import { Request, Response } from "express";
import {
  createStockMovement,
  getAllStockMovements,
} from "../services/stock.service.js";
import { stockSchema } from "../validators/stock.validator.js";

export async function getStockMovements(
  req: Request,
  res: Response
) {
  try {
    const movements = await getAllStockMovements();

    return res.status(200).json({
      success: true,
      data: movements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stock movements",
    });
  }
}

export async function addStockMovement(
  req: Request,
  res: Response
) {
  try {
    const validatedData = stockSchema.parse(req.body);

    // Temporary user ID
    // Later we'll replace this with req.user.id from JWT
    const userId = "cmrwzsmtn00004p0tn231xyqq";
    const movement = await createStockMovement({
      ...validatedData,
      userId,
    });

    return res.status(201).json({
      success: true,
      data: movement,
    });
  } catch (error: any) {
  console.error(error);

  return res.status(400).json({
    success: false,
    message: error.message,
  });
}
}