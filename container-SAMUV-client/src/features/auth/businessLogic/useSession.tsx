import { useCallback } from "react";
import CredentialKeys from "@/stores/CredentialsKeys";
import { UserRoles } from "../../../stores/EUserRoles";
import { useNavigate } from "react-router-dom";
import { ISession } from "../domain/ISession";
import { IProfile, Profile, visitorProfile } from "../domain/Profile";

export default function useSession() {
  const navigate = useNavigate();
  const deleteRefreshToken = () => {
    localStorage.removeItem(CredentialKeys.TOKEN_REFRESH);
  };

  const deleteAccessToken = () => {
    localStorage.removeItem(CredentialKeys.TOKEN_ACCESS);
  };

  const deleteProfile = () => {
    localStorage.removeItem(CredentialKeys.PROFILE);
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
    return localStorage.getItem(CredentialKeys.TOKEN_ACCESS) ?? null;
  }, []);

  const getRefreshToken = useCallback(() => {
    return localStorage.getItem(CredentialKeys.TOKEN_REFRESH) ?? null;
  }, []);

  const getProfile = useCallback((): Profile => {
    const profileString = localStorage.getItem(CredentialKeys.PROFILE);

    const userIsVisitor =
      !Boolean(profileString) || profileString === "undefined";

    if (userIsVisitor) {
      return visitorProfile;
    }

    return JSON.parse(profileString as string) as Profile;
  }, []);

  const refreshAccessToken = useCallback((token: string) => {
    localStorage.setItem(CredentialKeys.TOKEN_ACCESS, token);
    window.location.reload();
  }, []);

  const storeSession = useCallback((data: ISession) => {
    const accessToken = data[CredentialKeys.TOKEN_ACCESS] ?? "";
    const refreshToken = data[CredentialKeys.TOKEN_REFRESH] ?? "";
    const profile = data[CredentialKeys.PROFILE];

    localStorage.setItem(CredentialKeys.TOKEN_ACCESS, accessToken);
    localStorage.setItem(CredentialKeys.TOKEN_REFRESH, refreshToken);
    localStorage.setItem(CredentialKeys.PROFILE, JSON.stringify(profile));

    window.location.reload();
  }, []);

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
