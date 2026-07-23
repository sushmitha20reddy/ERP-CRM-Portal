import prisma from "../prisma/client.js";
export async function getAllCustomers(page = 1, limit = 10, search = "") {
    const skip = (page - 1) * limit;
    const where = {
        customerName: {
            contains: search,
            mode: "insensitive",
        },
    };
    const [customers, total] = await Promise.all([
        prisma.customer.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.customer.count({
            where,
        }),
    ]);
    return {
        customers,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
}
export async function createCustomer(data) {
    return await prisma.customer.create({
        data
    });
}
export async function getCustomerById(id) {
    return await prisma.customer.findUnique({
        where: {
            id,
        },
        include: {
            followUps: {
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    followUpDate: "desc",
                },
            },
        },
    });
}
export async function updateCustomer(id, data) {
    return await prisma.customer.update({
        where: {
            id,
        },
        data,
    });
}
export async function deleteCustomer(id) {
    return await prisma.customer.delete({
        where: {
            id,
        },
    });
}
