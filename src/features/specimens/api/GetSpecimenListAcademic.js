import { api } from "../../../lib/apiClient"
import { SPECIMEN_LIST_ACADEMIC_URL } from "./specimenURL"

export const getSpecimenListAcademic = async () => {
  const response = await api.get(SPECIMEN_LIST_ACADEMIC_URL);
  console.log(response);
}

