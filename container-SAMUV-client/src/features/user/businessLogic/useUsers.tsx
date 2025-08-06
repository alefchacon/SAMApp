import { useState, useCallback } from "react";
import { TECHNICAL_PERSON_URL } from "./userURL";
import useApi from "../../../dataAccess/useApi";
import EHttpStatus from "@/stores/EHttpStatus";
import { ITechnicalPerson } from "../domain/TechnicalPerson";

export default function useUsers() {
  const [technicalPersons, setTechnicalPersons] = useState<ITechnicalPerson[]>(
    []
  );
  const { apiWrapper } = useApi();

  const getTechnicalPersons = useCallback(async () => {
    apiWrapper
      .get({ url: TECHNICAL_PERSON_URL })
      .then((response) => setTechnicalPersons(response.data));
  }, []);

  const addTechnicalPerson = useCallback(async (technicalPerson: any) => {
    const response = await apiWrapper.post({
      url: TECHNICAL_PERSON_URL,
      body: technicalPerson,
    });
    if (response.success) {
      // const newTechnicalPerson = response.data.data;
      // setTechnicalPersons((prev) => [...prev, newTechnicalPerson]);
      setTechnicalPersons((prev) => [...prev, tech]);
    }
  }, []);

  const deleteTechnicalPerson = useCallback(
    async (technicalPersonId: number) => {
      const response = await apiWrapper.delete({
        url: `${TECHNICAL_PERSON_URL}${technicalPersonId}/`,
      });
      if (response.status === EHttpStatus.OK) {
        const newTechnicalPersons = technicalPersons.filter(
          (technicalPerson) => technicalPerson.id !== technicalPersonId
        );
        setTechnicalPersons(newTechnicalPersons);
      }
    },
    []
  );

  return {
    technicalPersons,
    getTechnicalPersons,
    addTechnicalPerson,
    deleteTechnicalPerson,
  };
}
