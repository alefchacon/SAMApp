import { useContext } from "react";
import {
  SnackbarContext,
  useSnackbar,
} from "../components/contexts/SnackbarContext";

import { ModalContext, useModal } from "../components/contexts/ModalContext";

import { api } from "../lib/apiClient";

import CREDENTIALS_KEYS from "../stores/credentialsKeys";

import RefreshForm from "../features/auth/components/RefreshForm";

export const useAxiosInterceptors = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const { showModal } = useContext(ModalContext);

  api.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem(CREDENTIALS_KEYS.TOKEN_ACCESS);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      //setIsLoading(true);
      return config;
    },
    function (error) {
      //setIsLoading(true);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      //setIsLoading(false);
      return response;
    },
    (error) => {
      const status = error.response?.status;
      const canRefresh = Boolean(
        localStorage.getItem(CREDENTIALS_KEYS.TOKEN_REFRESH)
      );
      showSnackbar(error.response?.data?.detail, true);

      if (status === 401 && canRefresh) {
        console.log("aquí refrescaría");
        showModal("La sesión ha expirado", <RefreshForm />, false);
      }
      //setIsLoading(false);

      return Promise.reject(error);
    }
  );
};
