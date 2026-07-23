import prisma from "../prisma/client.js";

export async function createFollowUp(data: {
  followUpDate: Date;
  notes: string;
  customerId: string;
  createdById: string;
}) {
  return await prisma.followUp.create({
    data,
  });
}

export async function getFollowUpsByCustomer(customerId: string) {
  return await prisma.followUp.findMany({
    where: {
      customerId,
    },
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
  });
}

export async function updateFollowUp(
  id: string,
  data: {
    followUpDate?: Date;
    notes?: string;
  }
) {
  return await prisma.followUp.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteFollowUp(id: string) {
  return await prisma.followUp.delete({
    where: {
      id,
    },
  });
}