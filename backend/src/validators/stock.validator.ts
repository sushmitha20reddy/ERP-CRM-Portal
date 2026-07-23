import { z } from "zod";

export const stockSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  movementType: z.enum(["IN", "OUT"]),
  reason: z.string().min(3),
});