import axios from "axios";
import { API_URL } from "../config/env";
import { useSnackbar, SnackbarContext } from "../components/contexts/SnackbarContext";
import { useModal, ModalContext } from "../components/contexts/ModalContext";
import { useStatus } from "../components/contexts/StatusContext";
import { useContext } from "react";
import CREDENTIALS_KEYS from "../stores/credentialsKeys";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const apiWrapper = {
  async get(url, config = {}) {
    try {
      const response = await api.get(url, config);
      return response;
    } catch (error) {
      handleApiError(error);
      throw error; // Re-throw if you want calling code to be able to catch specific errors
    }
  },

  async post(url, data, config = {}) {
    try {
      const response = await api.post(url, data, config);
      return response;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  // Add other methods (put, delete, etc.) as needed...
};

function handleApiError(error) {
  if (!error.intercepted) {
    console.error('Este error no se interceptó:', error);
    // Additional error handling logic
  }

}


export {api, apiWrapper}


