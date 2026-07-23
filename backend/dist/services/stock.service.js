import prisma from "../prisma/client.js";
export async function createStockMovement(data) {
    const product = await prisma.product.findUnique({
        where: {
            id: data.productId,
        },
    });
    if (!product) {
        throw new Error("Product not found");
    }
    let updatedStock = product.currentStock;
    if (data.movementType === "IN") {
        updatedStock += data.quantity;
    }
    else {
        if (product.currentStock < data.quantity) {
            throw new Error("Insufficient stock");
        }
        updatedStock -= data.quantity;
    }
    await prisma.product.update({
        where: {
            id: data.productId,
        },
        data: {
            currentStock: updatedStock,
        },
    });
    return await prisma.stockMovement.create({
        data: {
            quantity: data.quantity,
            movementType: data.movementType,
            reason: data.reason,
            productId: data.productId,
            createdById: data.userId,
        },
    });
}
export async function getAllStockMovements() {
    return await prisma.stockMovement.findMany({
        include: {
            product: true,
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
