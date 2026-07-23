import { createChallan as createChallanService, getAllChallans, cancelChallan, } from "../services/challan.service.js";
import { challanSchema } from "../validators/challan.validator.js";
export async function getChallans(req, res, next) {
    try {
        const challans = await getAllChallans();
        return res.status(200).json({
            success: true,
            data: challans,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function createChallan(req, res, next) {
    try {
        const validatedData = challanSchema.parse(req.body);
        const userId = req.user.id;
        const challan = await createChallanService({
            ...validatedData,
            userId,
        });
        return res.status(201).json({
            success: true,
            data: challan,
        });
    }
    catch (error) {
        next(error);
    }
}
export async function cancelChallanById(req, res, next) {
    try {
        const challan = await cancelChallan(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Challan cancelled successfully",
            data: challan,
        });
    }
    catch (error) {
        next(error);
    }
}
