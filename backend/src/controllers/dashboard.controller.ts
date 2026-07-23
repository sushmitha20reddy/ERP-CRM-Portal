import { Request, Response, NextFunction } from "express";
import { getDashboardSummary } from "../services/dashboard.service.js";

export async function dashboardSummary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const summary = await getDashboardSummary();

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
}