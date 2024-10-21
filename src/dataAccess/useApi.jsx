import axios from "axios";
import { useSnackbar } from "../components/contexts/SnackbarContext";
import { useStatus } from "../components/contexts/StatusContext";
import RefreshForm from "../features/auth/components/RefreshForm";
import CREDENTIALS_KEYS from "../stores/credentialsKeys";
export default function useApi() {
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useStatus();
  const token = localStorage.getItem(CREDENTIALS_KEYS.TOKEN_ACCESS);

  const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const apiWrapper = {
    async get(url, config = {}) {
      setLoading(true);
      try {
        const response = await api.get(url, config);
        return response;
      } catch (error) {
        handleError(error);
        throw error; // Re-throw if you want calling code to be able to catch specific errors
      } finally {
        setLoading(false);
      }
    },

    async post(url, data, config = {}) {
      setLoading(true);
      try {
        const response = await api.post(url, data, config);
        showSnackbar(response.data.message);
        return response;
      } catch (error) {
        handleError(error, config);
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
  };

  function handleError(error, config) {
    if (error.response) {
      error.response.intercepted = true;
    }
    error.intercepted = true;

    if (!config.noSnackbar) {
      handleSnackbar(error);
    }

    const status = error.response?.status;
    if (status === 401) {
      handleUnauthorized();
      return;
    }
  }

  function handleSnackbar(error) {
    console.log(error);
    if (error.code === "ERR_NETWORK") {
      showSnackbar("No hay conexión", true);
      return;
    }

    showSnackbar(getErrorContent(error), true);
  }

  function getErrorContent(error) {
    if (error.response?.data?.detail) {
      return error.response?.data?.detail;
    }
    if (error.response?.data?.error) {
      return error.response?.data?.error;
    }
    if (error.response?.data?.message) {
      return error.response?.data?.message;
    }
  }

  function handleUnauthorized() {
    const canRefresh = Boolean(
      localStorage.getItem(CREDENTIALS_KEYS.TOKEN_REFRESH)
    );
    if (!canRefresh) {
      logOutFront();
      return;
    }
    showModal(
      "La sesión ha expirado",
      <RefreshForm onLogOut={closeModal} />,
      false
    );
  }

  return { apiWrapper };
}
