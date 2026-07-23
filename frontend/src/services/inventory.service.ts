import api from "./api";

export const getStockMovements = async () => {
  const response = await api.get("/stocks");
  return response.data.data;
};