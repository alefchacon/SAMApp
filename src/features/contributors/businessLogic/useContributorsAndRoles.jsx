import { useState, useCallback } from "react";
import useApi from "../../../dataAccess/useApi";

import { CONTRIBUTORS_URL, CONTRIBUTORS_SPECIMEN_URL } from "./contributorsURL";
import CONTRIBUTOR_ROLES from "../../../stores/contributorRoles";
import ContributorSpecimenSerializer from "../domain/contributorSpecimenSerializer";
import Contributor from "../domain/contributor";
import HttpStatus from "../../../stores/httpStatus";

export default function useContributorsAndRoles() {
  const [contributors, setContributors] = useState([]);
  const { apiWrapper } = useApi();
  const getContributors = useCallback(async () => {
    const response = await apiWrapper.get(CONTRIBUTORS_URL);
    const contributorModels = response.data.map(
      (contributor) => new Contributor(contributor)
    );
    setContributors(contributorModels);
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

      if (response.status === HttpStatus.CREATED) {
        setContributors((prevContributors) => [
          response.data.data,
          ...prevContributors,
        ]);
      }

      return response;
    }
  );
  const updateContributor = useCallback(
    async (contributorToUpdate = new Contributor()) => {
      console.log(contributorToUpdate);

      const response = await apiWrapper.put(
        `${CONTRIBUTORS_URL}/${contributorToUpdate.id}/`,
        contributorToUpdate
      );

      if (response.status === HttpStatus.OK) {
        const contributorsSansOldValue = contributors.filter(
          (contributor) => contributor.id !== contributorToUpdate.id
        );
        const contributorsPlusNewValue = [
          ...contributorsSansOldValue,
          response.data.data,
        ];
        setContributors(contributorsPlusNewValue);
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
    updateContributor,
    /*
    roles,
    getRoles,
    addRoles,
    updateRoles,
    */
  };
}
