import { useState, useCallback } from "react";

import useApi from "../../../dataAccess/useApi";
import {
  ACCESS_REQUESTS_URL,
  REQUEST_PENDING,
  REQUEST_PENDING_COUNT,
  REQUEST_APPROVE,
  REQUEST_REJECT,
} from "../../../config/accessURL";
import AccessRequest from "../domain/accessRequest";

export default function useAccessRequests() {
  const { apiWrapper } = useApi();
  const [pendingAccessRequests, setPendingAccessRequests] = useState([]);
  const [pendingAccessRequestCount, setPendingAccessRequestCount] = useState(
    []
  );

  const getPendingAccessRequests = useCallback(async () => {
    const response = await apiWrapper.get(REQUEST_PENDING);
    console.log(response.data);
    setPendingAccessRequests(response.data.map(request => new AccessRequest(request)));
  }, []);

  const getPendingAccessRequestCount = async () => {
    const response = await apiWrapper.get(REQUEST_PENDING_COUNT);
    setPendingAccessRequestCount(response.data);
  };

  const approveAccessRequest = async (requestId = 0) => {
    const response = await apiWrapper.get(REQUEST_APPROVE(requestId));
    setPendingAccessRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== requestId)
    );
    setPendingAccessRequestCount(pendingAccessRequests.length);
  };
  const rejectAccessRequest = async (requestId = 0) => {
    const response = await apiWrapper.get(REQUEST_REJECT(requestId));
    setPendingAccessRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== requestId)
    );
    setPendingAccessRequestCount(pendingAccessRequests.length);
  };
  const addAccessRequest = async (accessRequest = {}) => {
    return await apiWrapper.post(ACCESS_REQUESTS_URL, accessRequest);
  };

  return {
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
    addAccessRequest,
  };
}
