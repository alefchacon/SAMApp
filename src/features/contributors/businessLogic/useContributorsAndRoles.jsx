import { useState, useCallback } from "react";
import useApi from "../../../dataAccess/useApi";

import { CONTRIBUTORS_URL, CONTRIBUTORS_SPECIMEN_URL } from "./contributorsURL";
import CONTRIBUTOR_ROLES from "../../../stores/contributorRoles";
import ContributorSpecimenSerializer from "../domain/contributorSpecimenSerializer";

export default function useContributorsAndRoles() {
  const [contributors, setContributors] = useState([]);
  const { apiWrapper } = useApi();
  const getContributors = useCallback(async () => {
    const response = await apiWrapper.get(CONTRIBUTORS_URL);
    setContributors(response.data);
  });

  const postContributor = useCallback(
    async (newContributor = { name: "", code: "" }) => {
      const body = {
        name: newContributor.name,
        code: newContributor.code,
      };
      const response = await apiWrapper.post(
        CONTRIBUTORS_URL.concat("/"),
        body
      );

      if (response.status === 201) {
        console.log(response.data.instance);
        setContributors((prevSpecies) => [
          response.data.instance,
          ...prevSpecies,
        ]);
      }

      return response;
    }
  );

  const postContributorSpecimen = useCallback(
    async (
      newContributorSpecimen = {
        specimen: 0,
        contributor: 0,
        contributor_role: CONTRIBUTOR_ROLES.COLECTOR,
      }
    ) => {
      const body = {
        specimen: newContributorSpecimen.specimen,
        contributor: newContributorSpecimen.contributor,
        contributor_role: newContributorSpecimen.contributor_role,
      };
      const response = await apiWrapper.post(
        CONTRIBUTORS_SPECIMEN_URL.concat("/"),
        body
      );
      return response;
    }
  );

  const updateContributorSpecimen = useCallback(
    async (updatedContributorSpecimen) => {
      const response = await apiWrapper.put(
        CONTRIBUTORS_SPECIMEN_URL.concat(`/${updatedContributorSpecimen.id}/`),
        new ContributorSpecimenSerializer(updatedContributorSpecimen)
      );
      return response;
    }
  );

  return {
    contributors,
    getContributors,
    postContributor,
    postContributorSpecimen,
    updateContributorSpecimen,
    /*
    updateContributor,
    roles,
    getRoles,
    addRoles,
    updateRoles,
    */
  };
}
