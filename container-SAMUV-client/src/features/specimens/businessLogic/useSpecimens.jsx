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
import SPECIMEN_KEYS from "../../../stores/specimenKeys";

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

  const addSpecimen = async (newSpecimen = {}, specieId = 0) => {
    newSpecimen.specie = specieId;

    newSpecimen.preparator = {
      contributor: newSpecimen.preparator.contributor_id,
      contributor_role: newSpecimen.preparator.contributor_role_id,
    }
    newSpecimen.colector = {
      contributor: newSpecimen.colector.contributor_id,
      contributor_role: newSpecimen.colector.contributor_role_id,
    }


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
  
  const getSpecimensForCSV = () => {
    const cleanSpecimens = specimens.map(specimen => {
      specimen.colector_code = specimen.colector.code;
      specimen.colector_name = specimen.colector.name;
      specimen.preparator_code = specimen.preparator.code;
      specimen.preparator_name = specimen.preparator.name;
      delete specimen.colector;
      delete specimen.preparator;
      delete specimen.specie;
      delete specimen.id;
      delete specimen.location.id;
      delete specimen.location.specimen;
      return specimen;
    });
    return cleanSpecimens;
  }
  const toCSV = async () => {
    
    const cleanSpecimens = getSpecimensForCSV()

    const keys = Object.keys(flattenObject(cleanSpecimens[0], "", {}, false));
    const translatedKeys = keys.map(key => SPECIMEN_KEYS[key])    
    
    const csvRows = [];
    csvRows.push(translatedKeys.join(","));
    
    cleanSpecimens.forEach((specimen) => {
      const values = keys.map((key) => {
        let value = flattenObject(specimen)[key];
 
        // Some user inputs can include commas. Given that CSVs
        // use commas as delimiters, these user commas can negatively
        // impact the way the CSV is rendered, so we swap them out 
        // for another character: 
        
        if (typeof value === "string"){
          value = value.replace(/,/, "; ")
        }
        return value ?? " ";
      });
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

  const updateSpecimen = async (updatedSpecimen) => {
    const body = updatedSpecimen;
    const config = {
      noConfirmation: true,
    }
    const response = await apiWrapper.put(
      `${SPECIMEN_URL}/${updatedSpecimen.id}/`,
      body,
      config
    );
    return response;
  };
  

  return {
    specimens,
    getSpecimen,
    addSpecimen,
    deleteSpecimen,
    downloadSpecimens,
    updateSpecimen
  };
};
