import axios from "axios";
import { apiUrl } from "@/routing/BackendRoutes";
import CredentialKeys from "@/stores/CredentialsKeys";
import TApiParams from "./domain/TApiParams";
const token = localStorage.getItem(CredentialKeys.TOKEN_ACCESS);

// DEV ONLY: check how we're handling errors here

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

const apiWrapper = {
  async get<T>({ url, config }: TApiParams<T>) {
    try {
      const response = await api.get(url, config);
      return response;
    } catch (error) {
      // handleApiError(error);
      throw error;
    }
  },
  async put<T>({ url, body, config }: TApiParams<T>) {
    try {
      const response = await api.put(url, body, config);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export { api, apiWrapper };
