import { api } from "../../../dataAccess/apiClient.js";
import CREDENTIALS_KEYS from "../../../stores/credentialsKeys";
import { LOGOUT_URL } from "./authUrls.js";
const logOut = async () => {

  /*
  About the log out procedure:

  Currently, this app does not call the log out API endpoint 
  (http://localhost:8000/api/logout/) because it does not expire either of the 
  session tokens on log out. Meaning that,  after the user "logs out", that access
  token can still make requests, and that refresh token can still generate new 
  access tokens, so there is no point in calling the endpoint.
  */

  /*
  About the attributes in the request:

  The API typically refers to the refresh token as simply "refresh", however, the log out 
  endpoint expects this value to be called 
  "refresh_token" hence the separation between REFRESH and REFRESH_LOGOUT. REFRESH_LOGOUT
  is only used here: for every other purpose, use REFRESH.
  */
  const refreshTokenLogoutName = CREDENTIALS_KEYS.TOKEN_REFRESH_LOGOUT;
  const body = {}
  body[refreshTokenLogoutName] = localStorage.getItem(CREDENTIALS_KEYS.TOKEN_REFRESH);
  
  const response = await api.post(LOGOUT_URL, body);

  if (response.status !== 200){
    throw new Error("No pudimos cerrar sesión");
  }
  window.location.reload();
}

const clearStorage = () => {
  localStorage.removeItem(CREDENTIALS_KEYS.TOKEN_ACCESS);
  localStorage.removeItem(CREDENTIALS_KEYS.TOKEN_REFRESH);
  localStorage.removeItem(CREDENTIALS_KEYS.PROFILE);
}

export {logOut, clearStorage};
