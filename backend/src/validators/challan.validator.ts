import { z } from "zod";

export const challanSchema = z.object({
  customerId: z.string(),

  status: z.enum([
    "DRAFT",
    "CONFIRMED",
    "CANCELLED",
  ]),

  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
    })
  ),
});