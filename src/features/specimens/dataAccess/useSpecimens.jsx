import { useState, useEffect } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import { api } from "../../../lib/apiClient";
import {
  SPECIMEN_LIST_URL,
  SPECIMEN_LIST_ACADEMIC_URL,
  SPECIMEN_LIST_VISITOR_URL,
} from "./specimenURL";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { mockGetSpecimens } from "./GetSpecimens";

export const useSpecimens = (specieId = 0) => {
  const [specimens, setSpecimens] = useState([]);
  const { profile } = useStatus();

  useEffect(() => {
    //setSpecimens([]);

    /*
    getSpecimensByRole(specieId, profile?.role).then((response) => {
      setSpecimens(response.data);
    });
    */
    mockSpecimens().then((response) => {
      setSpecimens(response);
    });
  }, [specieId]);

  const mockSpecimens = async () => {
    const max = 100;
    const min = 50;

    const fakeSpecimens = await mockGetSpecimens(
      Math.floor(Math.random() * (max - min + 1) + min)
    );
    console.log(fakeSpecimens);
    return fakeSpecimens;
  };

  return [specimens, setSpecimens];
};

async function getSpecimensByRole(specieId = 0, role = ROLE_TYPES.VISITOR) {
  if (!Boolean(role)) {
    throw new Error("Debe iniciar sesión");
  }

  let url = SPECIMEN_LIST_VISITOR_URL(specieId);

  if (role === ROLE_TYPES.ACADEMIC) {
    url = SPECIMEN_LIST_ACADEMIC_URL(specieId);
  }
  if (role === ROLE_TYPES.TECHNICAL_PERSON) {
    url = SPECIMEN_LIST_URL(specieId);
  }

  const response = await api.get(url);
  return response;
}
