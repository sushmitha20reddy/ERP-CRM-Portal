import prisma from "../prisma/client.js";
export async function getDashboardSummary() {
    const [totalCustomers, totalProducts, totalChallans, products, recentChallans,] = await Promise.all([
        prisma.customer.count(),
        prisma.product.count(),
        prisma.challan.count(),
        prisma.product.findMany({
            select: {
                id: true,
                name: true,
                currentStock: true,
                minimumStock: true,
                warehouseLocation: true,
            },
        }),
        prisma.challan.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        customerName: true,
                    },
                },
            },
        }),
    ]);
    const lowStockProducts = products.filter((product) => product.currentStock <= product.minimumStock);
    return {
        totalCustomers,
        totalProducts,
        totalChallans,
        lowStockCount: lowStockProducts.length,
        lowStockProducts,
        recentChallans,
    };
}
