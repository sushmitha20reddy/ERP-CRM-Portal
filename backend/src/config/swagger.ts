import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ERP CRM API",
      version: "1.0.0",
      description: "ERP CRM Backend API Documentation",
    },
    servers: [
  {
    url: process.env.NODE_ENV === "production"
      ? "https://erp-crm-portal-8p2u.onrender.com"
      : "http://localhost:3000",
  },
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export default swaggerJsdoc(options);