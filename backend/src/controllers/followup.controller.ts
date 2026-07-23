import { Request, Response } from "express";
import { followUpSchema } from "../validators/followup.validator.js";
import {
  createFollowUp,
  getFollowUpsByCustomer,
  updateFollowUp,
  deleteFollowUp,
} from "../services/followup.service.js";

type CustomerParams = {
  customerId: string;
};

type FollowUpParams = {
  id: string;
};

export async function addFollowUp(
  req: Request<CustomerParams>,
  res: Response
) {
  try {
    const data = followUpSchema.parse({
      ...req.body,
      customerId: req.params.customerId,
    });

    const followUp = await createFollowUp({
      ...data,
      createdById: req.user.id,
    });

    return res.status(201).json({
      success: true,
      data: followUp,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getCustomerFollowUps(
  req: Request<CustomerParams>,
  res: Response
) {
  try {
    const followUps = await getFollowUpsByCustomer(req.params.customerId);

    return res.status(200).json({
      success: true,
      data: followUps,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function editFollowUp(
  req: Request<FollowUpParams>,
  res: Response
) {
  try {
    const followUp = await updateFollowUp(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      data: followUp,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeFollowUp(
  req: Request<FollowUpParams>,
  res: Response
) {
  try {
    await deleteFollowUp(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Follow-up deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}