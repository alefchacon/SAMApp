import { useState, useEffect } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import { api } from "../../../lib/apiClient";
import {
  SPECIMEN_LIST_URL,
  SPECIMEN_LIST_ACADEMIC_URL,
  SPECIMEN_LIST_VISITOR_URL,
} from "./specimenURL";
import { ROLE_TYPES } from "../../../stores/roleTypes";

export const useSpecimens = (specieId = 0) => {
  const [specimens, setSpecimens] = useState([]);
  const { profile } = useStatus();

  useEffect(() => {
    getSpecimensByRole(specieId, profile.role).then((response) => {
      console.log(response.data);
      setSpecimens(response.data);
    });
  }, [specieId]);

  return [specimens, setSpecimens];
};

async function getSpecimensByRole(specieId = 0, role = ROLE_TYPES.VISITOR) {
  if (!Boolean(role)) {
    throw new Error("Debe iniciar sesión");
  }
  switch (role) {
    case ROLE_TYPES.VISITOR:
      return await getSpecimenListVisitor(specieId);
    case ROLE_TYPES.ACADEMIC:
      return await getSpecimenListAcademic(specieId);
    case ROLE_TYPES.TECHNICAL_PERSON:
      return await getSpecimenList(specieId);
    default:
      throw new Error(`El rol ${role} es desconocido`);
  }
}

const getSpecimenListVisitor = async (specieId) => {
  const response = await api.get(SPECIMEN_LIST_VISITOR_URL(specieId));
  return response;
};
const getSpecimenListAcademic = async (specieId) => {
  const response = await api.get(SPECIMEN_LIST_ACADEMIC_URL(specieId));
  return response;
};
const getSpecimenList = async (specieId) => {
  const response = await api.get(SPECIMEN_LIST_URL(specieId));
  return response;
};
