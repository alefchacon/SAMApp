import { useState, useEffect } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import { api } from "../../../dataAccess/apiClient";
import {
  SPECIMEN_LIST_URL,
  SPECIMEN_LIST_ACADEMIC_URL,
  SPECIMEN_LIST_VISITOR_URL,
  SPECIMEN_URL,
} from "./specimenURL";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { mockGetSpecimens, mockGetSpecimensAcademic } from "./GetSpecimens";
import CONTRIBUTOR_ROLES from "../../../stores/contributorRoles";

export const useSpecimens = (specieId = 0) => {
  const [specimens, setSpecimens] = useState([]);
  const { profile } = useStatus();

  useEffect(() => {
    getSpecimensByRole(specieId, profile?.role).then((response) => {
      setSpecimens(response.data);
    });
  }, [specieId]);

  const mockSpecimens = async () => {
    const max = 100;
    const min = 50;

    const fakeSpecimens = await mockGetSpecimens(
      Math.floor(Math.random() * (max - min + 1) + min)
    );
    console.log(fakeSpecimens);
    return fakeSpecimens;
  };
  const mockSpecimensAcademic = async () => {
    const max = 100;
    const min = 50;

    const fakeSpecimens = await mockGetSpecimensAcademic(
      Math.floor(Math.random() * (max - min + 1) + min)
    );
    console.log(fakeSpecimens);
    return fakeSpecimens;
  };

  const getSpecimens = async () => {};
  const addSpecimen = async (newSpecimen = {}, specieId = 0) => {
    const body = {
      colection_code: newSpecimen.colection_code,
      catalog_id: newSpecimen.catalog_id,
      colection_date: newSpecimen.colection_date,
      preparation_date: newSpecimen.preparation_date,
      hour: newSpecimen.hour,
      status: newSpecimen.status,
      sex: newSpecimen.sex,
      number_embryos: newSpecimen.number_embryos,
      comment: newSpecimen.comment,

      length_total: newSpecimen.length_total,
      length_ear: newSpecimen.length_ear,
      length_paw: newSpecimen.length_paw,
      length_tail: newSpecimen.length_tail,
      weight: newSpecimen.weight,

      class_age: newSpecimen.class_age,

      specie: specieId,
    };

    console.log(body);

    const response = await api.post(SPECIMEN_URL.concat("/"), body);
    return response;
  };

  return [specimens, getSpecimens, addSpecimen];
};

async function getSpecimensByRole(specieId = 0, role = ROLE_TYPES.VISITOR) {
  if (!Boolean(role)) {
    throw new Error("Debe iniciar sesión");
  }

  let response = null;

  if (role === ROLE_TYPES.TECHNICAL_PERSON) {
    response = await api.get(SPECIMEN_LIST_URL(specieId));
    response.data = response.data.map((specimen) => {
      specimen.colector = specimen.contributor_specimens.filter(
        (contributor) =>
          contributor.contributor_role === CONTRIBUTOR_ROLES.COLECTOR
      )[0];
      specimen.preparator = specimen.contributor_specimens.filter(
        (contributor) =>
          contributor.contributor_role === CONTRIBUTOR_ROLES.PREPARADOR
      )[0];
      return specimen;
    });
  } else if (role === ROLE_TYPES.ACADEMIC) {
    response = await api.get(SPECIMEN_LIST_ACADEMIC_URL(specieId));
  } else {
    response = await api.get(SPECIMEN_LIST_VISITOR_URL(specieId));
  }

  return response;
}
