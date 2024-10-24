import { createContext, useContext, useState } from "react";
import CREDENTIALS_KEYS from "../../stores/credentialsKeys";
import { ROLE_TYPES } from "../../stores/roleTypes";

import { logOut, clearStorage } from "../../features/auth/businessLogic/logOut";

export const StatusContext = createContext(null);

export function useStatus() {
  return useContext(StatusContext);
}

export function StatusProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const storedCredentials =
    JSON.parse(localStorage.getItem(CREDENTIALS_KEYS.CREDENTIALS)) || null;

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem(CREDENTIALS_KEYS.PROFILE)) || {
      role: ROLE_TYPES.VISITOR,
    }
  );

  /*
  Profile is a wrapper used to make all role-based validations.
  */

  const logOutFront = async () => {
    //await logOut();
    clearStorage();
    setProfile(null);
    setProfile(null);
  };

  const getProfile = () => {
    let profile = JSON.parse(localStorage.getItem(CREDENTIALS_KEYS.PROFILE));
    if (!Boolean(profile)) {
      profile = {
        role: ROLE_TYPES.VISITOR,
      };
    }
    return profile;
  };

  return (
    <StatusContext.Provider
      value={{
        loading,
        setLoading,
        setProfile,
        getProfile,
        profile,
        logOutFront,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
}
