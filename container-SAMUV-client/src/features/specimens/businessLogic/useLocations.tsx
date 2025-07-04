import { useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import LOCATIONS_URL from "./urls/locationURL";
import Location from "../domain/model/Location";

export const useLocations = (specieId = 0) => {
  const { apiWrapper } = useApi();

  const updateLocation = useCallback(async (updatedLocation: Location) => {
    const body = updatedLocation;
    const config = {
      noConfirmation: true,
    };
    const response = await apiWrapper.put({
      url: `${LOCATIONS_URL}/${updatedLocation.id}/`,
      body,
      config,
    });
    return response;
  }, []);

  return { updateLocation };
};
