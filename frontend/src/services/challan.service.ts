import api from "./api";

export const getChallans = async () => {
  const response = await api.get("/challans");
  return response.data.data;
};

export const createChallan = async (challan: any) => {
  const response = await api.post("/challans", challan);
  return response.data;
};

export const cancelChallan = async (id: string) => {
  const response = await api.patch(`/challans/${id}/cancel`);
  return response.data;
};