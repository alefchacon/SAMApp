import { useState, useCallback } from "react";

import useApi from "../../../dataAccess/useApi";
import {
  ACCESS_REQUESTS_URL,
  REQUEST_PENDING,
  REQUEST_PENDING_COUNT,
  REQUEST_APPROVE,
  REQUEST_REJECT,
} from "./accessURL";
import { AccessRequest, IAccessRequest } from "../domain/AccessRequest";
export default function useAccessRequests() {
  const { apiWrapper } = useApi();
  const [pendingAccessRequests, setPendingAccessRequests] = useState<
    AccessRequest[]
  >([]);

  const getPendingAccessRequests = async () => {
    const response = await apiWrapper.get<IAccessRequest[]>({
      url: REQUEST_PENDING,
    });

    if (response.apiResponse?.data) {
      setPendingAccessRequests(
        response.apiResponse.data.map(
          (request: IAccessRequest) => new AccessRequest(request)
        )
      );
    }
  };

  const STORED_COUNT_KEY = "pendingAccessRequestCount";
  const getPendingAccessRequestCount = async () => {
    const response = await apiWrapper.get<number>({
      url: REQUEST_PENDING_COUNT,
    });

    if (!response.apiResponse?.data) {
      localStorage.setItem(STORED_COUNT_KEY, String(0));
    }

    const fetchedCount = response.apiResponse?.data || 0;
    localStorage.setItem(STORED_COUNT_KEY, fetchedCount.toString());
  };

  const approveAccessRequest = async (requestId = 0) => {
    const response = await apiWrapper.get({ url: REQUEST_APPROVE(requestId) });

    const newPendingAccessRequest = pendingAccessRequests.filter(
      (request) => request.id !== requestId
    );
    setPendingAccessRequests(newPendingAccessRequest);

    localStorage.setItem(
      STORED_COUNT_KEY,
      newPendingAccessRequest.length.toString()
    );
  };
  const rejectAccessRequest = async (requestId = 0) => {
    const response = await apiWrapper.get({ url: REQUEST_REJECT(requestId) });
    setPendingAccessRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== requestId)
    );
  };
  const addAccessRequest = async (accessRequest = {}) => {
    return await apiWrapper.post({
      url: ACCESS_REQUESTS_URL,
      body: accessRequest,
    });
  };

  return {
    pendingAccessRequests,
    getPendingAccessRequests,

    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
    addAccessRequest,
  };
}
