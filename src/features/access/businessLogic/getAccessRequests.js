import { api } from "../../../lib/apiClient";
import ACCESS_REQUESTS_URL from "../../../config/accessUrls";

export async function getAccessRequests(){
  return await api.get(ACCESS_REQUESTS_URL);
}
export async function getAccessRequestsCount(){
  return await api.get(ACCESS_REQUESTS_URL.concat("?count=1"));
}