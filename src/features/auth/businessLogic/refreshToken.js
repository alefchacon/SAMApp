import { api } from "../../../dataAccess/apiClient.js";
import { TOKEN_REFRESH_URL } from "./authUrls.js";
import CREDENTIALS_KEYS from "../../../stores/credentialsKeys";


const refreshToken = async () => {

  const refreshToken = localStorage.getItem(CREDENTIALS_KEYS.TOKEN_REFRESH); 
  if (!refreshToken){
    return;
  }

  const body = {
    "refresh": refreshToken,
  }

  const response = await api.post(TOKEN_REFRESH_URL, body);

  console.log(response.request.status)

  if (response.request.status !== 200) {
    throw new Error("No podemos darle más tiempo por el momento.")
  }

  localStorage.removeItem(CREDENTIALS_KEYS.TOKEN_REFRESH);
  localStorage.setItem(CREDENTIALS_KEYS.TOKEN_ACCESS, response.data[CREDENTIALS_KEYS.TOKEN_ACCESS]);

  window.location.reload();
}

export default refreshToken;