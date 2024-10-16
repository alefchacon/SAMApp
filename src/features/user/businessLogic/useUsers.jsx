import { useState, useCallback } from "react";
import { apiWrapper } from "../../../dataAccess/apiClient";
import { TECHNICAL_PERSON_URL } from "./userURL";

export default function useUsers() {
  const [technicalPersons, setTechnicalPersons] = useState([]);

  const getTechnicalPersons = useCallback(async () => {
    apiWrapper
      .get(TECHNICAL_PERSON_URL)
      .then((response) => setTechnicalPersons(response.data));
  });

  return { technicalPersons, getTechnicalPersons };
}
