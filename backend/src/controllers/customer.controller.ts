import { Request, Response, NextFunction } from "express";
import {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service.js";
import { customerSchema } from "../validators/customer.validator.js";

type CustomerParams = {
  id: string;
};

// GET /customers
export async function getCustomers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";

    const result = await getAllCustomers(
      page,
      limit,
      search
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
}
// POST /customers
export async function addCustomer(req: Request, res: Response) {
  try {
    const validatedData = customerSchema.parse(req.body);

    const customer = await createCustomer(validatedData);

    return res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// GET /customers/:id
export async function getCustomer(
  req: Request<CustomerParams>,
  res: Response
) {
  try {
    const customer = await getCustomerById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// PUT /customers/:id
export async function editCustomer(
  req: Request<CustomerParams>,
  res: Response
) {
  try {
    const validatedData = customerSchema.parse(req.body);

    const customer = await updateCustomer(req.params.id, validatedData);

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// DELETE /customers/:id
export async function removeCustomer(
  req: Request<CustomerParams>,
  res: Response
) {
  try {
    await deleteCustomer(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}