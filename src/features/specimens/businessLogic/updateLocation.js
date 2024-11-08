
import LOCATIONS_URL from "./urls/locationURL";
import { apiWrapper } from "../../../dataAccess/apiClient";

const updateLocation = async (updatedLocation) => {
  console.log("update location")
  const body = updatedLocation;
  const response = await apiWrapper.put(
    `${LOCATIONS_URL}/${updatedLocation.id}/`,
    body
  );
  return response;
};


export default updateLocation;