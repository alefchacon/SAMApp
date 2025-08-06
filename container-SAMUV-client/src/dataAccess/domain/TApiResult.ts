import { AxiosError } from "axios";

type TApiResult<T> = {
  success: boolean;
  data?: T;
  error?: AxiosError;
};

interface IApiResponse<T> {
  message: string;
  data: T;
}

export interface IApiResult<T> {
  success: boolean;
  apiResponse?: IApiResponse<T>;
  error?: AxiosError;
}

export default TApiResult;
