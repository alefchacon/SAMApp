import { useState, useEffect, useCallback, useMemo } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import {
  SPECIMEN_LIST_URL,
  SPECIMEN_LIST_ACADEMIC_URL,
  SPECIMEN_LIST_VISITOR_URL,
  SPECIMEN_URL,
} from "./urls/specimenURL.js";
import { UserRoles } from "../../../stores/EUserRoles";
import moment from "moment";
import Specimen, { ISpecimen } from "../domain/model/Specimen";
import useDownload from "@/hooks/useDownload";
import useApi from "../../../dataAccess/useApi";
import EHttpStatus from "../../../stores/EHttpStatus";
import useSession from "../../auth/businessLogic/useSession";
import flattenObject from "../../../utils/flattenObject";
import SPECIMEN_KEYS from "../domain/enum/SpecimenKeys";
import { Specie } from "@/features/specie/domain/Specie";
import { AxiosResponse } from "axios";
import TApiResult, { IApiResult } from "@/dataAccess/domain/TApiResult";

export const useSpecimens = (specie?: Specie) => {
  const [specimens, setSpecimens] = useState<Specimen[]>([]);
  const { getProfile } = useSession();
  const [profile] = useState(getProfile());
  const download = useDownload();
  const { apiWrapper } = useApi();

  type TGetSpecimensByRoleParams = {
    specieId: number;
    role: UserRoles;
  };

  const specimenListApiCalls = {
    [UserRoles.TECHNICAL_PERSON]: (specieId: number) =>
      apiWrapper.get<Specimen[]>({ url: SPECIMEN_LIST_URL(specieId) }),
    [UserRoles.ACADEMIC]: (specieId: number) =>
      apiWrapper.get<Specimen[]>({ url: SPECIMEN_LIST_ACADEMIC_URL(specieId) }),
    [UserRoles.VISITOR]: (specieId: number) =>
      apiWrapper.get<Specimen[]>({ url: SPECIMEN_LIST_VISITOR_URL(specieId) }),
  };

  const getSpecimensByRole = async ({
    specieId = 0,
    role = UserRoles.VISITOR,
  }: TGetSpecimensByRoleParams): Promise<IApiResult<Specimen[]>> => {
    const response = await specimenListApiCalls[role](specieId);
    return response;
  };

  useEffect(() => {
    if (specie) {
      getSpecimensByRole({ specieId: specie.id, role: profile?.role }).then(
        (response) => {
          console.error(response);
          if (!response.success || !response.apiResponse?.data) {
            return;
          }

          const specimens = response?.apiResponse.data.map((specimen) => {
            specimen.specie = specie;
            return specimen;
          });

          setSpecimens(specimens);
        }
      );
    }
  }, [specie, profile?.role]);

  const getSpecimen = useCallback(async (specimenId: number) => {
    const response = await apiWrapper.get({
      url: `${SPECIMEN_URL}/${specimenId}`,
    });
    return response;
  }, []);

  /*
    DEV ONLY
    I need to unfuck the design in the backend, because the way we are handling the 
    contributors is a fucking mess right now.
  */
  const addSpecimen = async (newSpecimen: Specimen, specieId: number = 0) => {
    newSpecimen.specie = specieId;

    newSpecimen.preparator = {
      contributor: newSpecimen.preparator!.contributor_id,
      contributor_role: newSpecimen.preparator!.contributor_role_id,
    };

    newSpecimen.colector = {
      contributor: newSpecimen.colector!.contributor_id,
      contributor_role: newSpecimen.colector!.contributor_role_id,
    };

    const response = await apiWrapper.post({
      url: SPECIMEN_URL.concat("/"),
      body: newSpecimen,
    });

    return response;
  };

  const deleteSpecimen = useCallback(async (specimenToDelete: Specimen) => {
    const response = await apiWrapper.delete({
      url: `${SPECIMEN_URL}/${specimenToDelete.id}`,
    });
    if (response.success) {
      const newSpecimens = specimens.filter(
        (specimen) => specimen.id !== specimenToDelete.id
      );
      setSpecimens(newSpecimens);
    }
  }, []);

  const getSpecimensForCSV = () => {
    const cleanSpecimens = specimens.map((specimen) => {
      specimen.colector_code = specimen.colector?.code;
      specimen.colector_name = specimen.colector?.name;
      specimen.preparator_code = specimen.preparator?.code;
      specimen.preparator_name = specimen.preparator?.name;
      delete specimen.colector;
      delete specimen.preparator;
      delete specimen.specie;
      delete specimen.id;
      delete specimen.location?.id;
      return specimen;
    });
    return cleanSpecimens;
  };
  const toCSV = async () => {
    const cleanSpecimens = getSpecimensForCSV();

    const keys = Object.keys(flattenObject(cleanSpecimens[0], "", {}, false));
    const translatedKeys = keys.map(
      (key) => SPECIMEN_KEYS[key as keyof Specimen]
    );

    const csvRows = [];
    csvRows.push(translatedKeys.join(","));

    cleanSpecimens.forEach((specimen) => {
      const values = keys.map((key) => {
        let value = flattenObject(specimen)[key];

        // Some user inputs can include commas. Given that CSVs
        // use commas as delimiters, these user commas can negatively
        // impact the way the CSV is rendered, so we swap them out
        // for another character:

        if (typeof value === "string") {
          value = value.replace(/,/, "; ");
        }
        return value ?? " ";
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  const downloadSpecimens = () => {
    const filename = `IIB_${specie?.epithet
      .split(" ")
      .join("-")}_${moment().format("YYYY-MM-DD")}`;
    toCSV().then((csv) => {
      download({ file: csv, type: "text/csv", filename: filename });
    });
  };

  const updateSpecimen = async (
    updatedSpecimen: Specimen
  ): Promise<TApiResult<Specimen>> => {
    const config = {
      noConfirmation: true,
    };
    const apiResult = await apiWrapper.put<Specimen>({
      url: `${SPECIMEN_URL}/${updatedSpecimen.id}/`,
      body: updatedSpecimen,
      config,
    });
    return apiResult;
  };

  return {
    specimens,
    getSpecimen,
    addSpecimen,
    deleteSpecimen,
    downloadSpecimens,
    updateSpecimen,
  };
};
