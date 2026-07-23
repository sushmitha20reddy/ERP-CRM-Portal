import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),

  sku: z.string().min(3, "SKU is required"),

  unitPrice: z.number().positive("Unit price must be greater than 0"),

  currentStock: z.number().int().min(0),

  minimumStock: z.number().int().min(0),

  warehouseLocation: z.string().min(2, "Warehouse location is required"),

  categoryId: z.string().min(1, "Category is required"),
});