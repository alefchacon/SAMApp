import { SnackbarContext } from "../components/contexts/SnackbarContext";
import { api } from "./apiClient";
import { StatusContext } from "../components/contexts/StatusContext";
import { useContext } from "react";
import useErrorHandler from "./useErrorHandler.jsx";
import HttpStatus from "../stores/httpStatus.js";
import useSession from "../features/auth/businessLogic/useSession.jsx";
export const useAxiosInterceptors = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const { setLoading } = useContext(StatusContext);
  const {deleteSessionWithoutReload} = useSession();
  const {
    handleBackendMessage, 
    handleUnauthorized
  } = useErrorHandler();
  api.interceptors?.request.use(
    function (config) {
      setLoading(true);
      return config;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  api.interceptors?.response.use(
    (response) => {
      setLoading(false);
      const message = response?.data?.message;

      if (message !== undefined) {
        showSnackbar(message);
      }
      console.log(response);
      return response;
    },
    (error) => {
      handleError(error);

      setLoading(false);

      return Promise.reject(error);
    }
  );

  /*
  Error messages are centralized here. Layers above dataAccess do not receive errors
  unless they specify it in the apiWrapper config. 
  */
  function handleError(error, config) {
    /*
    Upper layers can configure a request in case feedback for a specific
    use case needs special treatment, though so far this is rarely the case.
    Check useSpecie.migrateColection for an example. 
    */
    if (!config?.noSnackbar) {
      const message = handleBackendMessage(error, config);
      showSnackbar(message, true);
    }

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


};
