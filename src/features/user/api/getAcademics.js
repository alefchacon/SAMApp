import { ACADEMIC_URL } from "./userURL";
import { api } from "../../../lib/apiClient";

const getAcademics = () => {
  const response = api.get(ACADEMIC_URL);
  return response;
}

export default getAcademics;