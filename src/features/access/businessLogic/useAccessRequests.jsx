import { useState, useEffect, useCallback } from "react";

import { api } from "../../../lib/apiClient";
import {
  ACCESS_REQUESTS_URL,
  REQUEST_PENDING,
  REQUEST_PENDING_COUNT,
  REQUEST_APPROVE,
  REQUEST_REJECT,
  REQUEST_VERIFY_TOKEN,
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
  const addAccessRequest = async (accessRequest = {}) => {
    const body = {
      orcid: accessRequest.orcid,
      about: accessRequest.about,
      email: accessRequest.email,
    };
    await api.post(ACCESS_REQUESTS_URL, body);
  };
  const verifyAccessRequestToken = async (token) => {
    const body = {
      token: token,
    };

    try {
      const response = await api.post(REQUEST_VERIFY_TOKEN, body);
      console.log(response.status);
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };

  return [
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
    addAccessRequest,
    verifyAccessRequestToken,
  ];
}
