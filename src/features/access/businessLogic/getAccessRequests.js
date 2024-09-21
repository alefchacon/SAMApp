import { api } from "../../../dataAccess/apiClient";
import { REQUEST_PENDING, REQUEST_PENDING_COUNT } from "../../../config/accessURL";

export async function getPendingAccessRequests(){
  return await api.get(REQUEST_PENDING);
}
export async function getPendingAccessRequestsCount(){
  return await api.get(REQUEST_PENDING_COUNT);
}