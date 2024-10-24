import { useState, useEffect, useCallback } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import {
  SPECIMEN_LIST_URL,
  SPECIMEN_LIST_ACADEMIC_URL,
  SPECIMEN_LIST_VISITOR_URL,
  SPECIMEN_URL,
} from "./specimenURL";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import moment from "moment";
import Specimen from "../domain/specimen";
import useDownload from "../../../hooks/useDownload";
import useApi from "../../../dataAccess/useApi";

export const useSpecimens = (specie) => {
  const [specimens, setSpecimens] = useState([]);
  const { getProfile } = useStatus();
  const profile = getProfile();
  const download = useDownload();
  const { apiWrapper } = useApi();

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

  const getSpecimen = useCallback(async (specimenId) => {
    const response = await apiWrapper.get(`${SPECIMEN_URL}/${specimenId}`);
    return response;
  });

  const postSpecimen = async (newSpecimen = {}, specieId = 0) => {
    newSpecimen.specie = specieId;

    const response = await apiWrapper.post(
      SPECIMEN_URL.concat("/"),
      newSpecimen
    );

    return response;
  };

  const updateSpecimen = useCallback(async (updatedSpecimen) => {
    const body = new Specimen(updatedSpecimen);
    const response = await apiWrapper.put(
      `${SPECIMEN_URL}/${updatedSpecimen.id}/`,
      body
    );
    return response;
  });

  const deleteSpecimen = useCallback(async (specimenId = 0) => {
    const response = await apiWrapper.delete(`${SPECIMEN_URL}/${specimenId}`);
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
      download(
        csv,
        "text/csv",
        `IIB_${specie.epithet.split(" ").join("-")}_${moment().format(
          "YYYY-MM-DD"
        )}`
      );
    });
  });

  async function getSpecimensByRole(specieId = 0, role = ROLE_TYPES.VISITOR) {
    if (!Boolean(role)) {
      throw new Error("Debe iniciar sesión");
    }

    let response = null;

    if (role === ROLE_TYPES.TECHNICAL_PERSON) {
      response = await apiWrapper.get(SPECIMEN_LIST_URL(specieId));
    } else if (role === ROLE_TYPES.ACADEMIC) {
      response = await apiWrapper.get(SPECIMEN_LIST_ACADEMIC_URL(specieId));
    } else {
      response = await apiWrapper.get(SPECIMEN_LIST_VISITOR_URL(specieId));
    }

    return response;
  }
  return {
    specimens,
    getSpecimen,
    postSpecimen,
    updateSpecimen,
    deleteSpecimen,
    downloadSpecimens,
  };
};
