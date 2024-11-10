import { useMemo, useCallback } from "react";

import axios from "axios";
import { useSnackbar } from "../components/contexts/SnackbarContext";
import { useModal } from "../components/contexts/ModalContext";
import { useStatus } from "../components/contexts/StatusContext";
import RefreshForm from "../features/auth/components/RefreshForm";
import useSession from "../features/auth/businessLogic/useSession";
import CREDENTIALS_KEYS from "../stores/credentialsKeys";
import HttpStatus from "../stores/httpStatus";
import LogInForm from "../features/auth/components/LogInForm";
import flattenObject from "../utils/flattenObject";
export default function useApi() {
  const {
    deleteSession,
    deleteAccessToken,
    getRefreshToken,
    userIsLoggedIn,
    getAccessToken,
    getProfile,
    deleteSessionWithoutReload,
  } = useSession();
  const token = localStorage.getItem(CREDENTIALS_KEYS.TOKEN_ACCESS);

  const { showModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useStatus();

  const api = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:8000/api/",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }, [token]); // Only recreate when token changes

  const apiWrapper = useMemo(
    () => ({
      async get(url, config = {}) {
        setLoading(true);
        try {
          const response = await api.get(url, config);
          return response;
        } catch (error) {
          handleError(error);
          if (config.getError) {
            return error;
          }
        } finally {
          setLoading(false);
        }
      },

      async post(url, data, config = {}) {
        console.log(token);
        setLoading(true);
        try {
          const response = await api.post(url, data, config);
          showSnackbar(response.data.message);
          return response;
        } catch (error) {
          handleError(error, config);

          /*
        Upper layers can configure the apiWrapper to return errors, in case
        they need to handle them in a UI-specific way. 
        See useSpecie.migrateColection to see how its used.
        */

          if (config.getError) {
            return error;
          }
        } finally {
          setLoading(false);
        }
      },
      async put(url, data, config = {}) {
        setLoading(true);
        try {
          const response = await api.put(url, data, config);
          showSnackbar(response.data.message);
          return response;
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      },
    }),
    [api, handleError, setLoading, showSnackbar]
  );

  /*
  Error messages are centralized here. Layers above dataAccess do not receive errors
  unless they specify it in the apiWrapper config. 
  */
  function handleError(error, config) {
    handleBackendMessage(error, config);

    if (
      error.code === "ERR_NETWORK" ||
      error.response.status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      deleteSessionWithoutReload();
      return;
    }

    const status = error.response?.status;
    if (status === HttpStatus.UNAUTHORIZED) {
      handleUnauthorized();
    }
  }

  function handleBackendMessage(error, config) {
    /*
    Upper layers can configure a request in case feedback for a specific
    use case needs special treatment, though so far this is rarely the case.
    Check useSpecie.migrateColection for an example. 
    */
    if (config?.noSnackbar) {
      return;
    }

    if (
      error.code === "ERR_NETWORK" ||
      error.response.status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      showSnackbar("No hay conexión", true);
      return;
    }

    showSnackbar(getMessage(error), true);
  }

  function getMessage(error) {
    if (error.response?.data?.detail) {
      return error.response?.data?.detail;
    }
    if (error.response?.data?.error) {
      return error.response?.data?.error;
    }
    if (error.response?.data?.message) {
      return error.response?.data?.message;
    } else {
      return flattenObject(error.response.data);
    }
  }

  function handleUnauthorized() {
    const useCanRefresh =
      getRefreshToken() !== null && getRefreshToken() !== "undefined";

    if (userIsLoggedIn && useCanRefresh) {
      deleteAccessToken();
      showModal(
        "La sesión ha expirado",
        <RefreshForm onLogOut={closeModal} />,
        false
      );
      return;
    }

    deleteSession();
  }

  return { apiWrapper };
}
