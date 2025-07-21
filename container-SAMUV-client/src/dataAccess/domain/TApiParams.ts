import IRequestConfig from "./IRequestConfig";

export type TApiParams = {
  url: string;
  body?: any;
  config?: IRequestConfig;
};

export default TApiParams;
