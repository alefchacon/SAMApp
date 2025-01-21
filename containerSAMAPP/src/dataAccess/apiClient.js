import axios from "axios";
import { API_URL } from "../config/env";
import CREDENTIALS_KEYS from "../stores/credentialsKeys";
const token = localStorage.getItem(CREDENTIALS_KEYS.TOKEN_ACCESS);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
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
  async put(url, data, config = {}) {
    try {
      const response = await api.put(url, data, config);
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


