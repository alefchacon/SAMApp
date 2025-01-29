import { useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import {
  PASSWORD_RESET_URL,
  LOGOUT_URL,
  TOKEN_REFRESH_URL,
  LOGIN_URL,
  TOKEN_VERIFY_URL,
} from "./authUrls";
import useSession from "./useSession";
import HttpStatus from "../../../stores/httpStatus";

export default function useAuth() {
  const { apiWrapper } = useApi();
  const {
    deleteRefreshToken,
    storeSession,
    getRefreshToken,
    refreshAccessToken,
  } = useSession();

  const resetPassword = useCallback(async (credentials) => {
    const response = await apiWrapper.post(PASSWORD_RESET_URL, credentials);
    return response;
  });

  const logIn = async (username = "", password = "") => {

    const body = {
      username: username,
      password: password,
    };

    const response = await apiWrapper.post(LOGIN_URL, body, {
      getError: false,
    });

    if (response?.status === HttpStatus.OK) {
      storeSession(response?.data);
    }
  };

  const refreshToken = useCallback(async () => {
    const body = {
      refresh: getRefreshToken(),
    };
    const response = await apiWrapper.post(TOKEN_REFRESH_URL, body, {
      getError: true,
    });

    refreshAccessToken(response.data);

    deleteRefreshToken();
  });

  return {
    logIn,

    resetPassword,
    refreshToken,
  };
}
