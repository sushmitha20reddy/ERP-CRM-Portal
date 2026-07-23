import prisma from "../prisma/client.js";
export async function createChallan(data) {
    return await prisma.$transaction(async (tx) => {
        let totalQuantity = 0;
        let totalAmount = 0;
        const challan = await tx.challan.create({
            data: {
                challanNumber: `CH-${Date.now()}`,
                customerId: data.customerId,
                createdById: data.userId,
                status: data.status,
                totalQuantity: 0,
                totalAmount: 0,
            },
        });
        for (const item of data.items) {
            const product = await tx.product.findUnique({
                where: {
                    id: item.productId,
                },
            });
            if (!product) {
                throw new Error("Product not found");
            }
            if (data.status === "CONFIRMED" &&
                product.currentStock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}`);
            }
            if (data.status === "CONFIRMED") {
                await tx.product.update({
                    where: {
                        id: product.id,
                    },
                    data: {
                        currentStock: product.currentStock - item.quantity,
                    },
                });
            }
            await tx.challanItem.create({
                data: {
                    challanId: challan.id,
                    productId: product.id,
                    quantity: item.quantity,
                    productNameSnapshot: product.name,
                    unitPriceSnapshot: product.unitPrice,
                },
            });
            totalQuantity += item.quantity;
            totalAmount += product.unitPrice * item.quantity;
        }
        return await tx.challan.update({
            where: {
                id: challan.id,
            },
            data: {
                totalQuantity,
                totalAmount,
            },
            include: {
                customer: true,
                createdBy: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    });
}
export async function getAllChallans() {
    return await prisma.challan.findMany({
        include: {
            customer: true,
            createdBy: true,
            items: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
export async function cancelChallan(id) {
    return await prisma.$transaction(async (tx) => {
        const challan = await tx.challan.findUnique({
            where: { id },
            include: {
                items: true,
            },
        });
        if (!challan) {
            throw new Error("Challan not found");
        }
        if (challan.status === "CANCELLED") {
            throw new Error("Challan already cancelled");
        }
        // Restore stock
        // Restore stock only if the challan was CONFIRMED
        if (challan.status === "CONFIRMED") {
            for (const item of challan.items) {
                await tx.product.update({
                    where: {
                        id: item.productId,
                    },
                    data: {
                        currentStock: {
                            increment: item.quantity,
                        },
                    },
                });
            }
        }
        // Update status
        return await tx.challan.update({
            where: {
                id,
            },
            data: {
                status: "CANCELLED",
            },
            include: {
                customer: true,
                items: true,
            },
        });
    });
}
