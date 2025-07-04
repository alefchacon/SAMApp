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
    const response = await apiWrapper.post(PASSWORD_RESET_URL, credentials);
    return response;
  }, []);

  const logIn = async (username = "", password = "") => {
    const body: ICredentials = {
      username: username,
      password: password,
    };

    const response = await apiWrapper.post<ICredentials, ISession>(
      LOGIN_URL,
      body,
      {
        getError: false,
      }
    );

    if (response?.status === EHttpStatus.OK && "data" in response) {
      storeSession(response?.data);
    }
  };

  const refreshToken = useCallback(async () => {
    const body: ISession = {
      refresh: getRefreshToken(),
    };
    const response = await apiWrapper.post<ISession, ISession>(
      TOKEN_REFRESH_URL,
      body,
      {
        getError: true,
      }
    );

    if (response && "data" in response) {
      refreshAccessToken(response.data.refresh!);
    } else {
      console.error("Could not refresh token:", response);
    }

    deleteRefreshToken();
  }, []);

  return {
    logIn,

    resetPassword,
    refreshToken,
  };
}
