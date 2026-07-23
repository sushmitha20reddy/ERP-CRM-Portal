import api from "./api";

export const getFollowUps = async (customerId: string) => {
  const response = await api.get(`/api/followups/customer/${customerId}`);
  return response.data.data;
};

export const addFollowUp = async (
  customerId: string,
  followUp: {
    followUpDate: string;
    notes: string;
  }
) => {
  const response = await api.post(
    `/api/followups/customer/${customerId}`,
    {
      ...followUp,
      followUpDate: new Date(followUp.followUpDate),
    }
  );

  return response.data;
};

export const updateFollowUp = async (
  id: string,
  followUp: {
    followUpDate: string;
    notes: string;
  }
) => {
  const response = await api.put(`/api/followups/${id}`, {
    ...followUp,
    followUpDate: new Date(followUp.followUpDate),
  });

  return response.data;
};

export const deleteFollowUp = async (id: string) => {
  const response = await api.delete(`/api/followups/${id}`);
  return response.data;
};