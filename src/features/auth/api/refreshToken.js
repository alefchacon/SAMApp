import { api } from "../../../lib/apiClient";
import { TOKEN_REFRESH_URL } from "./authUrls";
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

  if (!response.status !== 200) {
    throw new Error("No podemos darle más tiempo por el momento.")
  }

  localStorage.removeItem(CREDENTIALS_KEYS.TOKEN_REFRESH);
  localStorage.setItem(CREDENTIALS_KEYS.TOKEN_ACCESS, response[CREDENTIALS_KEYS.TOKEN_ACCESS]);
}

export default refreshToken;