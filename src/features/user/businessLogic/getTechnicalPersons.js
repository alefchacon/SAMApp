import { TECHNICAL_PERSON_URL } from "./userURL";
import { api } from "../../../dataAccess/apiClient";

const getTechnicalPersons = () => {
  const response = api.get(TECHNICAL_PERSON_URL);
  return response;
}

export default getTechnicalPersons;