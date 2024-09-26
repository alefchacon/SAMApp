import { useEffect, useState } from "react";
import { api } from "../../../dataAccess/apiClient";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import { useModal } from "../../../components/contexts/ModalContext";

import Button from "../../../components/ui/Button";
import { SERVER_URL } from "../../../config/env";
import { CONTRIBUTORS_URL, CONTRIBUTORS_SPECIMEN_URL } from "./contributorsURL";
import CONTRIBUTOR_ROLES from "../../../stores/contributorRoles";

export default function useContributorsAndRoles() {
  const [contributors, setContributors] = useState([]);
  const [contributorRoles, setContributorRoles] = useState([]);

  async function getContributors() {
    const response = await api.get(CONTRIBUTORS_URL);
    setContributors(response.data);
  }

  const addContributor = async (newContributor = { name: "", code: "" }) => {
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
  };

  const addContributorSpecimen = async (
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
  };

  return [
    contributors,
    getContributors,
    addContributor,
    addContributorSpecimen,
    /*
    updateContributor,
    roles,
    getRoles,
    addRoles,
    updateRoles,
    */
  ];
}
