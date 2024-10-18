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

  const [credentials, setCredentials] = useState(
    JSON.parse(localStorage.getItem(CREDENTIALS_KEYS.CREDENTIALS)) || null
  );

  /*
  Profile is a wrapper used to make all role-based validations.
  */
  const [profile, setProfile] = useState(
    storedCredentials?.technicalPerson ?? storedCredentials?.academic
  );

  const logOutFront = async () => {
    //await logOut();
    clearStorage();
    setCredentials(null);
    setProfile(null);
  };

  return (
    <StatusContext.Provider
      value={{
        loading,
        setLoading,
        setCredentials,
        credentials,
        profile,
        logOutFront,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
}
