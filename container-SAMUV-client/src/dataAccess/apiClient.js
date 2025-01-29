import axios from "axios";
import { apiUrl } from "../routing/backendRoutes";
import CREDENTIALS_KEYS from "../stores/credentialsKeys";
const token = localStorage.getItem(CREDENTIALS_KEYS.TOKEN_ACCESS);

const api = axios.create({
  baseURL: apiUrl,
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
      throw error;
    }
  },
  async put(url, data, config = {}) {
    try {
      const response = await api.put(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

};



export {api, apiWrapper}


