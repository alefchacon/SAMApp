import { useState, useEffect, useCallback } from "react";
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
import moment from "moment";
import SpecimenSerializer from "../domain/specimenSerializer";

export const useSpecimens = (specie) => {
  const [specimens, setSpecimens] = useState([]);
  const { profile } = useStatus();

  useEffect(() => {
    if (specie) {
      getSpecimensByRole(specie.id, profile?.role).then((response) => {
        const specimens = response.data.map((specimen) => {
          specimen.specie = specie;
          return specimen;
        });
        setSpecimens(specimens);
      });
    }
  }, [specie]);

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

  const getSpecimen = useCallback(async (specimenId) => {
    const response = await api.get(`${SPECIMEN_URL}/${specimenId}`);
    return response;
  });

  const postSpecimen = async (newSpecimen = {}, specieId = 0) => {
    newSpecimen.specie = specieId;

    const response = await api.post(SPECIMEN_URL.concat("/"), newSpecimen);

    return response;
  };

  const updateSpecimen = useCallback(async (updatedSpecimen) => {
    const body = new SpecimenSerializer(updatedSpecimen);
    console.log(updatedSpecimen);
    console.log(body);
    const response = await api.put(
      `${SPECIMEN_URL}/${updatedSpecimen.id}/`,
      body
    );
    return response;
  });

  const deleteSpecimen = useCallback(async (specimenId = 0) => {
    const response = await api.delete(`${SPECIMEN_URL}/${specimenId}`);
    if (response.status === 204) {
      const newSpecimens = specimens.filter(
        (specimen) => specimen.id !== specimenId
      );
      setSpecimens(newSpecimens);
    }
  });

  const flattenObject = (nestedObject, parentKey = "", result = {}) => {
    for (let key in nestedObject) {
      if (nestedObject.hasOwnProperty(key)) {
        const newKey = parentKey ? `${key}` : key;

        if (
          typeof nestedObject[key] === "object" &&
          nestedObject[key] !== null
        ) {
          flattenObject(nestedObject[key], newKey, result);
        } else {
          result[newKey] = nestedObject[key];
        }
      }
    }
    return result;
  };

  const toCSV = async () => {
    const keys = Object.keys(flattenObject(specimens[0]));

    const csvRows = [];

    csvRows.push(keys.join(","));

    specimens.forEach((object) => {
      const values = keys.map((key) => flattenObject(object)[key]);
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  const downloadSpecimens = useCallback(() => {
    toCSV().then((csv) => {
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `IIB_${specie.epithet
        .split(" ")
        .join("-")}_${moment().format("YYYY-MM-DD")}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  return {
    specimens,
    getSpecimen,
    postSpecimen,
    updateSpecimen,
    deleteSpecimen,
    downloadSpecimens,
  };
};

async function getSpecimensByRole(specieId = 0, role = ROLE_TYPES.VISITOR) {
  if (!Boolean(role)) {
    throw new Error("Debe iniciar sesión");
  }

  let response = null;

  if (role === ROLE_TYPES.TECHNICAL_PERSON) {
    response = await api.get(SPECIMEN_LIST_URL(specieId));
  } else if (role === ROLE_TYPES.ACADEMIC) {
    response = await api.get(SPECIMEN_LIST_ACADEMIC_URL(specieId));
  } else {
    response = await api.get(SPECIMEN_LIST_VISITOR_URL(specieId));
  }

  return response;
}
