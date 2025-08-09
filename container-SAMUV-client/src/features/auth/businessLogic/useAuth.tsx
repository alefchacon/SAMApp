import { useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import { PASSWORD_RESET_URL, TOKEN_REFRESH_URL, LOGIN_URL } from "./AuthUrls";
import useSession from "./useSession";
import EHttpStatus from "../../../stores/EHttpStatus";
import { ICredentials } from "../domain/Credentials";
import CredentialKeys from "@/stores/CredentialsKeys";
import { ISession } from "../domain/ISession";

export default function useAuth() {
  const { apiWrapper } = useApi();
  const {
    deleteRefreshToken,
    storeSession,
    getRefreshToken,
    refreshAccessToken,
  } = useSession();

  const resetPassword = useCallback(async (credentials: ICredentials) => {
    const response = await apiWrapper.post({
      url: PASSWORD_RESET_URL,
      body: credentials,
    });
    return response;
  }, []);

  const logIn = async (username = "", password = "") => {
    const body: ICredentials = {
      username: username,
      password: password,
    };

    const response = await apiWrapper.post<ISession>({
      url: LOGIN_URL,
      body: body,
      config: {
        getError: false,
      },
    });

    if (response.success && response.apiResponse) {
      storeSession(response?.apiResponse as ISession);
    }
  };

  const refreshToken = useCallback(async () => {
    const url = TOKEN_REFRESH_URL;
    const body: ISession = {
      refresh: getRefreshToken(),
    };
    const response = await apiWrapper.post<ISession>({ url, body });

    if (response.success && response.apiResponse) {
      refreshAccessToken(response.apiResponse.access!);
    }

    deleteRefreshToken();
  }, []);

  return {
    logIn,

    resetPassword,
    refreshToken,
  };
}
