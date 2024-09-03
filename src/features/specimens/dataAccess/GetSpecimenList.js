import { api } from "../../../lib/apiClient"
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { SPECIMEN_LIST_VISITOR_URL, SPECIMEN_LIST_ACADEMIC_URL, SPECIMEN_LIST_URL } from "./specimenURL"

const getSpecimenListVisitor = async (specieId) => {
  const response = await api.get(SPECIMEN_LIST_VISITOR_URL(specieId));
  return response;
}
const getSpecimenListAcademic = async (specieId) => {
  const response = await api.get(SPECIMEN_LIST_ACADEMIC_URL(specieId));
  return response;
}
const getSpecimenList = async (specieId) => {
  const response = await api.get(SPECIMEN_LIST_URL(specieId));
  return response;
}

const getSpecimens = async (role = ROLE_TYPES.VISITOR, specieId = 0) => {
  switch ( role){
    case ROLE_TYPES.VISITOR:
      return await getSpecimenListVisitor(specieId);
    case ROLE_TYPES.ACADEMIC:
      return await getSpecimenListAcademic(specieId);
    case ROLE_TYPES.TECHNICAL_PERSON:
      return await getSpecimenList(specieId);
    default:
      throw new Error("Unknown role type");
  }
}

export default getSpecimens;