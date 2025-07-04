import React, { createContext, useContext, useState } from "react";

interface IStatusContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const StatusContext = createContext<IStatusContext | null>(null);

export function useStatus() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatus must be used within a StatusProvider");
  }
  return context;
}

interface IStatusProviderProps {
  children?: React.ReactNode;
}
export function StatusProvider(props: IStatusProviderProps) {
  const [loading, setLoading] = useState(false);

  return (
    <StatusContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {props.children}
    </StatusContext.Provider>
  );
}
