import { api } from "../../../../lib/apiClient";
export const getElevation = async (coordinateX, coordinateY) => {
  const url = `https://api.open-elevation.com/api/v1/lookup?locations=${coordinateY},${coordinateX}`
  return await api.get(url);
}