import express from "express";
import cors from "cors";
import prisma from "./prisma/client.js";
import customerRoutes from "./routes/customer.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import stockRoutes from "./routes/stock.routes.js";
import challanRoutes from "./routes/challan.routes.js";
import followUpRoutes from "./routes/followup.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/stocks", stockRoutes);
app.use("/challans", challanRoutes);
app.use("/api/followups", followUpRoutes);
app.use(errorHandler);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use("/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ERP CRM Backend is Running 🚀",
  });
});

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      database: "Connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      database: "Disconnected",
    });
  }
});

export default app;