import { followUpSchema } from "../validators/followup.validator.js";
import { createFollowUp, getFollowUpsByCustomer, updateFollowUp, deleteFollowUp, } from "../services/followup.service.js";
export async function addFollowUp(req, res) {
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
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
export async function getCustomerFollowUps(req, res) {
    try {
        const followUps = await getFollowUpsByCustomer(req.params.customerId);
        return res.status(200).json({
            success: true,
            data: followUps,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export async function editFollowUp(req, res) {
    try {
        const followUp = await updateFollowUp(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            data: followUp,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
export async function removeFollowUp(req, res) {
    try {
        await deleteFollowUp(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Follow-up deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
