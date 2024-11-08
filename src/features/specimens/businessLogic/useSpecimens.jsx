import { useState, useEffect, useCallback } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import {
  SPECIMEN_LIST_URL,
  SPECIMEN_LIST_ACADEMIC_URL,
  SPECIMEN_LIST_VISITOR_URL,
  SPECIMEN_URL,
} from "./urls/specimenURL";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import moment from "moment";
import Specimen from "../domain/specimen";
import useDownload from "../../../hooks/useDownload";
import useApi from "../../../dataAccess/useApi";
import HttpStatus from "../../../stores/httpStatus";
import useSession from "../../auth/businessLogic/useSession";
import flattenObject from "../../../utils/flattenObject";

export const useSpecimens = (specie) => {
  const [specimens, setSpecimens] = useState([]);
  const { getProfile } = useSession();
  const [profile] = useState(getProfile());
  const download = useDownload();
  const { apiWrapper } = useApi();

  const getSpecimensByRole = useCallback(
    async (specieId = 0, role = ROLE_TYPES.VISITOR) => {
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
    },
    [apiWrapper]
  );

  useEffect(() => {
    if (specie) {
      getSpecimensByRole(specie.id, profile?.role).then((response) => {
        const specimens = response?.data.map((specimen) => {
          specimen.specie = specie;
          return specimen;
        });

        setSpecimens(specimens);
      });
    }
  }, [specie, profile?.role]);

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

  const deleteSpecimen = useCallback(async (specimenId = 0) => {
    const response = await apiWrapper.delete(`${SPECIMEN_URL}/${specimenId}`);
    if (response.status === HttpStatus.NO_CONTENT) {
      const newSpecimens = specimens.filter(
        (specimen) => specimen.id !== specimenId
      );
      setSpecimens(newSpecimens);
    }
  });

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

  return {
    specimens,
    getSpecimen,
    postSpecimen,
    deleteSpecimen,
    downloadSpecimens,
  };
};
