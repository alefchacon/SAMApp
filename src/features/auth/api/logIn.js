import { api } from "../../../lib/apiClient"
import { LOGIN_URL } from "./authUrls"
import CREDENTIALS_KEYS from "../../../stores/credentialsKeys"
import { ROLE_TYPES } from "../../../stores/roleTypes"
import getAcademics from "../../user/api/getAcademics"
import getTechnicalPersons from "../../user/api/getTechnicalPersons"

import { jwtDecode } from "jwt-decode"

const logIn = async (username = "", password = "") => {
  const body = {
    username: username,
    password: password,
  }

  const response = await api.post(LOGIN_URL, body);

  const accessToken = response?.data[CREDENTIALS_KEYS.TOKEN_ACCESS];
  const refreshToken = response?.data[CREDENTIALS_KEYS.TOKEN_REFRESH];
  if (!accessToken || !refreshToken){
      return;
  }
  localStorage.setItem(CREDENTIALS_KEYS.TOKEN_ACCESS, accessToken)
  localStorage.setItem(CREDENTIALS_KEYS.TOKEN_REFRESH, refreshToken)
  
  /*
  The log in endpoint (http://localhost:8000/login/) returns only two values: an access token 
  and a refresh token. Each token has the following structure:

    exp: 1725381218
    iat: 1725294818
    jti: "72c8f9ef573a43e1a218de279f756869"
    token_type: "access" <- or "refresh"
    user_id: 2

  This app requires user credentials to serve role-specific views of specimens. Given that I
  lack such data, I have to make the following additional API calls:
  */

  const userId = jwtDecode(accessToken)["user_id"];
  const academics = (await getAcademics()).data;
  const technicalPersons = (await getTechnicalPersons()).data;
  let matchingAcademic = 
    academics.filter(academic => academic.user === userId)[0];
  if (matchingAcademic){
    matchingAcademic.role = ROLE_TYPES.ACADEMIC;
  }
  
  let matchingTechnicalPerson = 
    technicalPersons.filter(technicalPerson => technicalPerson.user === userId)[0];

  if (matchingTechnicalPerson){
    matchingTechnicalPerson.role = ROLE_TYPES.TECHNICAL_PERSON;
  }

  let allNames = matchingTechnicalPerson.fullname.split(" ");
  matchingTechnicalPerson["mother_last_name"] = allNames.pop();
  matchingTechnicalPerson["father_last_name"] = allNames.pop();
  matchingTechnicalPerson["names"] = allNames.join(" ");
  
  const credentials = {
    userId: userId,
    academic: matchingAcademic,
    technicalPerson: matchingTechnicalPerson,
  }  

  localStorage.setItem(
    CREDENTIALS_KEYS.CREDENTIALS, 
    JSON.stringify(credentials));

  return credentials;  
}


export default logIn