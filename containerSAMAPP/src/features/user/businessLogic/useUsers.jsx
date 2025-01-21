import { useState, useCallback } from "react";
import { TECHNICAL_PERSON_URL } from "./userURL";
import useApi from "../../../dataAccess/useApi";
import HttpStatus from "../../../stores/httpStatus";

export default function useUsers() {
  const [technicalPersons, setTechnicalPersons] = useState([]);
  const { apiWrapper } = useApi();

  const getTechnicalPersons = useCallback(async () => {
    apiWrapper
      .get(TECHNICAL_PERSON_URL)
      .then((response) => setTechnicalPersons(response.data));
  });

  const addTechnicalPerson = useCallback(async (technicalPerson) => {
    const response = await apiWrapper.post(TECHNICAL_PERSON_URL, technicalPerson);
    if (response.status === HttpStatus.CREATED){
      const newTechnicalPerson = response.data.data;
      setTechnicalPersons(prev => [...prev, newTechnicalPerson]);
    }
  });

  const deleteTechnicalPerson = useCallback(async (technicalPersonId) => {
    const response = await apiWrapper.delete(`${TECHNICAL_PERSON_URL}${technicalPersonId}/`);
    if (response.status === HttpStatus.OK){
      const newTechnicalPersons = 
        technicalPersons.filter(technicalPerson => technicalPerson.id !== technicalPersonId)
        setTechnicalPersons(newTechnicalPersons)
    }
  });


  return { technicalPersons, getTechnicalPersons, addTechnicalPerson, deleteTechnicalPerson};
}
