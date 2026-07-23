import { getDashboardSummary } from "../services/dashboard.service.js";
export async function dashboardSummary(req, res, next) {
    try {
        const summary = await getDashboardSummary();
        res.json({
            success: true,
            data: summary,
        });
    }
    catch (error) {
        next(error);
    }
}
