import { api } from "../../../lib/apiClient";
import CREDENTIALS_KEYS from "../../../stores/credentialsKeys";
import { LOGOUT_URL } from "./authUrls";

const logOut = async () => {

  /*
  The API typically refers to the refresh token as simply "refresh", however, the log out 
  endpoint (http://localhost:8000/api/logout/) expects this value to be called 
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

export default logOut;
