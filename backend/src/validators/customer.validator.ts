import { z } from "zod";

export const customerSchema = z.object({
  customerName: z.string().min(2),
  mobile: z.string().min(10).max(10),
  email: z.email(),
  businessName: z.string().min(2),
  gstNumber: z.string().optional(),
  customerType: z.enum(["RETAIL", "WHOLESALE", "DISTRIBUTOR"]),
  address: z.string().min(5)
});