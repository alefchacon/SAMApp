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
      .get<ITechnicalPerson[]>({ url: TECHNICAL_PERSON_URL })
      .then((response) =>
        setTechnicalPersons(response.apiResponse?.data || [])
      );
  }, []);

  const addTechnicalPerson = useCallback(async (technicalPerson: any) => {
    // const response = await apiWrapper.post<ITechnicalPerson>({
    //   url: TECHNICAL_PERSON_URL,
    //   body: technicalPerson,
    // });
    // if (response.success && response.apiResponse) {
    //   const newTechnicalPerson = response.apiResponse.data;
    //   setTechnicalPersons((prev) => [...prev, newTechnicalPerson]);
    // }
    setTechnicalPersons((prev) => [...prev, technicalPerson]);
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
