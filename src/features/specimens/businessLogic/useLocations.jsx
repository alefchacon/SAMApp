import { useState, useCallback } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import useApi from "../../../dataAccess/useApi";
import LOCATIONS_URL from "./urls/locationURL";

import { ROLE_TYPES } from "../../../stores/roleTypes";

export const useLocations = (specieId = 0) => {
  const [locations, setLocations] = useState([]);
  const { apiWrapper } = useApi();

  const getLocations = async () => {};
  const addLocation = useCallback(async (location = {}, specimenId = 0) => {
    const body = {
      coordinates_cartesian_plane_x: location.coordinates_cartesian_plane_x, //
      coordinates_cartesian_plane_y: location.coordinates_cartesian_plane_y, //
      geographical_coordinates_x: location.geographical_coordinates_x, //
      geographical_coordinates_y: location.geographical_coordinates_y, //
      utm_region: location.utm_region,
      msnm_google: location.msnm_google,
      altitude: location.altitude,
      institute_code: location.institute_code,
      institute: location.institute,
      specific_location: location.specific_location,
      municipality: location.municipality,
      state: location.state,
      country: location.country,
      specimen: specimenId,
    };

    const response = await apiWrapper.post(LOCATIONS_URL.concat("/"), body);
    return response;
  });

  return { locations, getLocations, addLocation };
};
