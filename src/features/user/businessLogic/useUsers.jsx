import { useState, useEffect } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import { api } from "../../../dataAccess/apiClient";

import { SIGNUP_URL } from "../../auth/businessLogic/authUrls";
import { ACADEMIC_URL, TECHNICAL_PERSON_URL } from "./userURL";
import { ROLE_TYPES } from "../../../stores/roleTypes";

export const useUsers = (specieId = 0) => {
  const { profile } = useStatus();

  useEffect(() => {
    //setSpecimens([]);

    /*
    getSpecimensByRole(specieId, profile?.role).then((response) => {
      setSpecimens(response.data);
    });
    */

    /*
    mockSpecimens().then((response) => {
      setSpecimens(response);
    });
    */
    mockSpecimensAcademic().then((response) => {
      setSpecimens(response);
    });
  }, [specieId]);

  const addUser = async (user = {}, token = "") => {
    const body = {
      username: user.username,
      password: user.password,
      email: user.email,
      first_name: user.names,
      last_name: user.father_last_name,
    };
    const response = await api.post(SIGNUP_URL.concat(`/${token}`));
    console.log(response);
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

  return [];
};

async function getSpecimensByRole(specieId = 0, role = ROLE_TYPES.VISITOR) {
  if (!Boolean(role)) {
    throw new Error("Debe iniciar sesión");
  }

  let url = SPECIMEN_LIST_VISITOR_URL(specieId);

  if (role === ROLE_TYPES.ACADEMIC) {
    url = SPECIMEN_LIST_ACADEMIC_URL(specieId);
  }
  if (role === ROLE_TYPES.TECHNICAL_PERSON) {
    url = SPECIMEN_LIST_URL(specieId);
  }

  const response = await api.get(url);
  return response;
}
