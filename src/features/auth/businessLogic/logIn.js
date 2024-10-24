import { api } from "../../../dataAccess/apiClient.js"
import { LOGIN_URL } from "./authUrls.js"
import CREDENTIALS_KEYS from "../../../stores/credentialsKeys"
import { ROLE_TYPES } from "../../../stores/roleTypes"
import getAcademics from "../../user/businessLogic/getAcademics"
import getTechnicalPersons from "../../user/businessLogic/getTechnicalPersons"

import { jwtDecode } from "jwt-decode"

const logIn = async (username = "", password = "") => {
  const body = {
    username: username,
    password: password,
  }

  const response = await api.post(LOGIN_URL, body);

  const accessToken = response?.data[CREDENTIALS_KEYS.TOKEN_ACCESS];
  const refreshToken = response?.data[CREDENTIALS_KEYS.TOKEN_REFRESH];
  const credentials = response?.data[CREDENTIALS_KEYS.PROFILE];
  if (!accessToken || !refreshToken){
      return;
  }
  localStorage.setItem(CREDENTIALS_KEYS.TOKEN_ACCESS, accessToken)
  localStorage.setItem(CREDENTIALS_KEYS.TOKEN_REFRESH, refreshToken)
  localStorage.setItem(CREDENTIALS_KEYS.PROFILE, JSON.stringify(credentials))

  window.location.reload();
    
}


export default logIn