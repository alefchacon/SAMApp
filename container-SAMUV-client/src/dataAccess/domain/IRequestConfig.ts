import { AxiosRequestConfig } from "axios";

export interface IRequestConfig extends AxiosRequestConfig {
  getError?: boolean;
  noConfirmation?: boolean;
  noSnackbar?: boolean;
}

export default IRequestConfig;
