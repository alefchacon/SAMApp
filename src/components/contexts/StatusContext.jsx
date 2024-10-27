import { createContext, useContext, useState } from "react";
import CREDENTIALS_KEYS from "../../stores/credentialsKeys";
import { ROLE_TYPES } from "../../stores/roleTypes";

export const StatusContext = createContext(null);

export function useStatus() {
  return useContext(StatusContext);
}

export function StatusProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const logOutFront = async () => {
    //await logOut();
    clearStorage();
    setProfile(null);
    setProfile(null);
  };

  return (
    <StatusContext.Provider
      value={{
        loading,
        setLoading,
        logOutFront,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
}
