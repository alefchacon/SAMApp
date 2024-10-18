import { useState, useCallback } from "react";
import { TECHNICAL_PERSON_URL } from "./userURL";
import useApi from "../../../dataAccess/useApi";

export default function useUsers() {
  const [technicalPersons, setTechnicalPersons] = useState([]);
  const { apiWrapper } = useApi();

  const getTechnicalPersons = useCallback(async () => {
    apiWrapper
      .get(TECHNICAL_PERSON_URL)
      .then((response) => setTechnicalPersons(response.data));
  });

  return { technicalPersons, getTechnicalPersons };
}
