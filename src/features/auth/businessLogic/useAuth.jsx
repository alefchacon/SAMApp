import { useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import { PASSWORD_RESET_URL } from "./authUrls";

export default function useAuth() {
  const { apiWrapper } = useApi();

  const resetPassword = useCallback(async (credentials) => {
    const response = await apiWrapper.post(PASSWORD_RESET_URL, credentials);
    return response;
  });

  return { resetPassword };
}
