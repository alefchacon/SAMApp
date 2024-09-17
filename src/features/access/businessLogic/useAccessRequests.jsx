import { useState, useEffect, useCallback } from "react";

import { api } from "../../../lib/apiClient";
import {
  REQUEST_PENDING,
  REQUEST_PENDING_COUNT,
  REQUEST_APPROVE,
  REQUEST_REJECT,
} from "../../../config/accessURL";

export async function getAccessRequests() {
  return await api.get(ACCESS_REQUESTS_URL);
}

export default function useAccessRequests() {
  const [pendingAccessRequests, setPendingAccessRequests] = useState([]);
  const [pendingAccessRequestCount, setPendingAccessRequestCount] = useState(
    []
  );

  const getPendingAccessRequests = useCallback(async () => {
    const response = await api.get(REQUEST_PENDING);
    setPendingAccessRequests(response.data);
  }, []);

  const getPendingAccessRequestCount = async () => {
    const response = await api.get(REQUEST_PENDING_COUNT);
    setPendingAccessRequestCount(response.data);
  };

  const approveAccessRequest = async (requestId = 0) => {
    const response = await api.get(REQUEST_APPROVE(requestId));
    setPendingAccessRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
    setPendingAccessRequestCount(pendingAccessRequests.length);
  };
  const rejectAccessRequest = async (requestId = 0) => {
    const response = await api.get(REQUEST_REJECT(requestId));
    setPendingAccessRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
    setPendingAccessRequestCount(pendingAccessRequests.length);
  };

  return [
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
  ];
}
