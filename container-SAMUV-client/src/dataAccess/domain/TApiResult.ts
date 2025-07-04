import { AxiosError } from "axios";

type TApiResult<T> = {
  success: boolean;
  data?: T;
  error?: AxiosError;
};

export default TApiResult;
