import prisma from "../prisma/client.js";

export async function getAllProducts(
  search?: string,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;

  return await prisma.product.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              sku: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              category: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {},

    include: {
      category: true,
    },

    skip,
    take: limit,

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getLowStockProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      currentStock: "asc",
    },
  });

  console.log("Products from DB:");
  console.table(
    products.map((p) => ({
      name: p.name,
      currentStock: p.currentStock,
      minimumStock: p.minimumStock,
      lowStock: p.currentStock <= p.minimumStock,
    }))
  );

  return products.filter(
    (product) => product.currentStock <= product.minimumStock
  );
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}

export async function createProduct(data: any) {
  return await prisma.product.create({
    data,
  });
}

export async function updateProduct(id: string, data: any) {
  return await prisma.product.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
}