import { useEffect, useState, useCallback } from "react";
import { api } from "../../../dataAccess/apiClient";

import { CONTRIBUTORS_URL, CONTRIBUTORS_SPECIMEN_URL } from "./contributorsURL";
import CONTRIBUTOR_ROLES from "../../../stores/contributorRoles";
import ContributorSpecimenSerializer from "../domain/contributorSpecimenSerializer";

export default function useContributorsAndRoles() {
  const [contributors, setContributors] = useState([]);

  const getContributors = useCallback(async () => {
    const response = await api.get(CONTRIBUTORS_URL);
    setContributors(response.data);
  });

  const addContributor = useCallback(
    async (newContributor = { name: "", code: "" }) => {
      const body = {
        name: newContributor.name,
        code: newContributor.code,
      };
      const response = await api.post(CONTRIBUTORS_URL.concat("/"), body);

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
      const response = await api.post(
        CONTRIBUTORS_SPECIMEN_URL.concat("/"),
        body
      );
      return response;
    }
  );

  const updateContributorSpecimen = useCallback(
    async (updatedContributorSpecimen) => {
      const response = await api.put(
        CONTRIBUTORS_SPECIMEN_URL.concat(`/${updatedContributorSpecimen.id}/`),
        new ContributorSpecimenSerializer(updatedContributorSpecimen)
      );
      return response;
    }
  );

  return {
    contributors,
    getContributors,
    addContributor,
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
