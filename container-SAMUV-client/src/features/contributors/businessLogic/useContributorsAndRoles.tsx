import { useState, useCallback } from "react";
import useApi from "../../../dataAccess/useApi";

import { CONTRIBUTORS_URL, CONTRIBUTORS_SPECIMEN_URL } from "./contributorsUrl";
import { EContributorRoles } from "@/stores/EContributorRoles";
import Contributor, { IContributorSpecimen } from "../domain/Contributor";
import TApiResult, { IApiResult } from "@/dataAccess/domain/TApiResult";
import { IContributorSpecimen2 } from "../domain/ContributorSpecimenSerializer";

export default function useContributorsAndRoles() {
  const [contributors, setContributors] = useState<IContributorSpecimen[]>([]);
  const { apiWrapper } = useApi();

  const getContributors = async () => {
    const response = await apiWrapper.get<IContributorSpecimen[]>({
      url: CONTRIBUTORS_URL,
    });

    if (response.error || !response.apiResponse?.data) {
      return;
    }

    const contributorModels = response.apiResponse.data.map(
      (contributor) => new Contributor(contributor)
    );

    setContributors(contributorModels);
  };

  const addContributor = async (
    newContributor: IContributorSpecimen
  ): Promise<TApiResult<Contributor>> => {
    const body = {
      name: newContributor.name,
      code: newContributor.code,
    };

    const response = await apiWrapper.post<Contributor>({
      url: CONTRIBUTORS_URL.concat("/"),
      body: body,
    });

    if (response.success && response.apiResponse) {
      const newContributor = response.apiResponse.data;
      const contributorsPlusNewValue = [newContributor, ...contributors];
      setContributors(contributorsPlusNewValue);
    }
    return Promise.resolve(response);
  };

  const updateContributor = async (
    contributorToUpdate: Contributor
  ): Promise<IApiResult<Contributor>> => {
    const response = await apiWrapper.put<Contributor>({
      url: `${CONTRIBUTORS_URL}/${contributorToUpdate.id}/`,
      body: contributorToUpdate,
    });

    if (response.success && response.apiResponse) {
      const updatedContributor = response.apiResponse.data;
      const contributorsSansOldValue = contributors.filter(
        (contributor) => contributor.id !== updatedContributor.id
      );
      const contributorsPlusNewValue = [
        ...contributorsSansOldValue,
        updatedContributor,
      ];
      setContributors(contributorsPlusNewValue);
    }

    return response;
  };

  const addContributorSpecimen = useCallback(
    async (
      newContributorSpecimen = {
        specimen: 0,
        contributor: 0,
        contributor_role: EContributorRoles.COLECTOR,
      }
    ) => {
      const body = {
        specimen: newContributorSpecimen.specimen,
        contributor: newContributorSpecimen.contributor,
        contributor_role: newContributorSpecimen.contributor_role,
      };
      const response = await apiWrapper.post({
        url: CONTRIBUTORS_SPECIMEN_URL.concat("/"),
        body: body,
      });
      return response;
    },
    []
  );

  /*
  const updateContributorSpecimen = useCallback(
    async (updatedContributorSpecimen) => {
      const response = await apiWrapper.put(
        CONTRIBUTORS_SPECIMEN_URL.concat(`/${updatedContributorSpecimen.id}/`),
        new ContributorSpecimenSerializer(updatedContributorSpecimen)
      );
      return response;
    }
  );
  */

  const updateContributorSpecimen = async (
    contributorSpecimen: IContributorSpecimen2
  ) => {
    const body = {
      id: contributorSpecimen.id,
      contributor: contributorSpecimen.contributor_id,
      contributor_role: contributorSpecimen.contributor_role_id,
    };
    const config = {
      noConfirmation: true,
    };
    await apiWrapper.put({
      url: `${CONTRIBUTORS_SPECIMEN_URL}/${body.id}/`,
      body,
      config,
    });
  };

  return {
    contributors,
    getContributors,
    addContributor,
    addContributorSpecimen,
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
