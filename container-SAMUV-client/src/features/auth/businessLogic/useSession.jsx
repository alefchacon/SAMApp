import { useCallback } from "react";
import CREDENTIALS_KEYS from "../../../stores/credentialsKeys";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { useNavigate } from "react-router-dom";
import { simplePathPrefix } from "../../../routing/backendRoutes";
export default function useSession() {
  const navigate = useNavigate();
  const deleteRefreshToken = () => {
    localStorage.removeItem(CREDENTIALS_KEYS.TOKEN_REFRESH);
  };

  const deleteAccessToken = () => {
    localStorage.removeItem(CREDENTIALS_KEYS.TOKEN_ACCESS);
  };

  const deleteProfile = () => {
    localStorage.removeItem(CREDENTIALS_KEYS.PROFILE);
  };

  const deleteSession = () => {
    deleteAccessToken();
    deleteRefreshToken();
    deleteProfile();
    navigate(``);
    window.location.reload();
  };

  const deleteSessionWithoutReload = () => {
    deleteAccessToken();
    deleteRefreshToken();
    deleteProfile();
  };

  const getAccessToken = useCallback(() => {
    return localStorage.getItem(CREDENTIALS_KEYS.TOKEN_ACCESS) ?? null;
  });
  const getRefreshToken = useCallback(() => {
    return localStorage.getItem(CREDENTIALS_KEYS.TOKEN_REFRESH) ?? null;
  });
  const getProfile = useCallback(() => {
    const profileString = localStorage.getItem(CREDENTIALS_KEYS.PROFILE);

    const userIsVisitor =
      !Boolean(profileString) || profileString === "undefined";

    if (userIsVisitor) {
      return {
        role: ROLE_TYPES.VISITOR,
      };
    }
    return JSON.parse(profileString);
  });
  const refreshAccessToken = useCallback((data) => {
    localStorage.setItem(
      CREDENTIALS_KEYS.TOKEN_ACCESS,
      data[CREDENTIALS_KEYS.TOKEN_ACCESS]
    );
    window.location.reload();
  });

  const storeSession = useCallback((data = {}) => {
    const accessToken = data[CREDENTIALS_KEYS.TOKEN_ACCESS];
    const refreshToken = data[CREDENTIALS_KEYS.TOKEN_REFRESH];
    const profile = data[CREDENTIALS_KEYS.PROFILE];

    localStorage.setItem(CREDENTIALS_KEYS.TOKEN_ACCESS, accessToken);
    localStorage.setItem(CREDENTIALS_KEYS.TOKEN_REFRESH, refreshToken);
    localStorage.setItem(CREDENTIALS_KEYS.PROFILE, JSON.stringify(profile));

    window.location.reload();
  });

  const userIsLoggedIn =
    Boolean(getAccessToken()) || Boolean(getRefreshToken());

  return {
    deleteSession,
    deleteRefreshToken,
    deleteAccessToken,
    deleteProfile,
    getAccessToken,
    getRefreshToken,
    getProfile,
    storeSession,
    refreshAccessToken,
    userIsLoggedIn,
    deleteSessionWithoutReload,
  };
}
