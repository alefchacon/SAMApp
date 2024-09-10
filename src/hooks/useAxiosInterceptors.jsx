import { useContext } from "react";
import {
  SnackbarContext,
  useSnackbar,
} from "../components/contexts/SnackbarContext";

import { ModalContext, useModal } from "../components/contexts/ModalContext";
import { StatusContext, useStatus } from "../components/contexts/StatusContext";

import { api } from "../lib/apiClient";
import { API_URL } from "../config/env";

import CREDENTIALS_KEYS from "../stores/credentialsKeys";

import RefreshForm from "../features/auth/components/RefreshForm";

export const useAxiosInterceptors = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const { showModal } = useContext(ModalContext);
  const { setLoading, logOutFront } = useContext(StatusContext);

  api.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem(CREDENTIALS_KEYS.TOKEN_ACCESS);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      setLoading(true);
      return config;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      const message = response?.data?.message;
      if (message !== undefined) {
        showSnackbar(message);
      }

      return response;
    },
    (error) => {
      handleError(error);

      setLoading(false);

      return Promise.reject(error);
    }
  );

  function handleError(error) {
    if (error.code === "ERR_NETWORK") {
      showSnackbar("No hay conexión", true);
      return;
    }
    showSnackbar(error.response?.data?.detail, true);

    const status = error.response?.status;
    const canRefresh = Boolean(
      localStorage.getItem(CREDENTIALS_KEYS.TOKEN_REFRESH)
    );
    if (status === 401 && canRefresh) {
      console.log("aquí refrescaría");
      showModal("La sesión ha expirado", <RefreshForm />, false);
    } else {
      logOutFront();
    }
  }
};
