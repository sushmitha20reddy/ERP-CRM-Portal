import { z } from "zod";

export const followUpSchema = z.object({
  followUpDate: z.coerce.date(),
  notes: z.string().min(1, "Notes are required"),
  customerId: z.string().min(1, "Customer ID is required"),
});