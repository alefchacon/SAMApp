import { api } from "../../../../dataAccess/apiClient";

export const getLocation
 = async (coordinateX, coordinateY) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lon=${coordinateX}&lat=${coordinateY}`
  return await apiClient.get(url);
}