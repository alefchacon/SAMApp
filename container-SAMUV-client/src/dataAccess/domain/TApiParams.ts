import IRequestConfig from "./IRequestConfig";

export type TApiParams<T> = {
  url: string;
  body?: T;
  config?: IRequestConfig;
};

export default TApiParams;
