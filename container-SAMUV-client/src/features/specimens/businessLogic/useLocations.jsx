import { useState, useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import LOCATIONS_URL from "./urls/locationURL";

export const useLocations = (specieId = 0) => {
  const [locations, setLocations] = useState([]);
  const { apiWrapper } = useApi();

  const getLocations = async () => {};
  const addLocation = useCallback(async (location = {}) => {

    const response = await apiWrapper.post(LOCATIONS_URL.concat("/"), body);
    return response;
  });

  const updateLocation = useCallback(async (updatedLocation) => {
    const body = updatedLocation;
    const config = {
      noConfirmation: true,
    }
    const response = await apiWrapper.put(
      `${LOCATIONS_URL}/${updatedLocation.id}/`,
      body,
      config
    );
    return response;
  });

  return { locations, getLocations, addLocation, updateLocation };
};
