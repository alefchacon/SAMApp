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
  const [pendingAccessRequestCount, setPendingAccessRequestCount] = useState(0);

  const getPendingAccessRequests = useCallback(async () => {
    const response = await apiWrapper.get<IAccessRequest[]>({
      url: REQUEST_PENDING,
    });

    if (response.data) {
      setPendingAccessRequests(
        response.data.map(
          (request: IAccessRequest) => new AccessRequest(request)
        )
      );
    }
  }, []);

  const getPendingAccessRequestCount = async () => {
    const response = await apiWrapper.get<number>({
      url: REQUEST_PENDING_COUNT,
    });
    if (response.data) {
      setPendingAccessRequestCount(response.data);
    }
  };

  const approveAccessRequest = async (requestId = 0) => {
    const response = await apiWrapper.get({ url: REQUEST_APPROVE(requestId) });
    setPendingAccessRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== requestId)
    );
    setPendingAccessRequestCount(pendingAccessRequests.length);
  };
  const rejectAccessRequest = async (requestId = 0) => {
    const response = await apiWrapper.get({ url: REQUEST_REJECT(requestId) });
    setPendingAccessRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== requestId)
    );
    setPendingAccessRequestCount(pendingAccessRequests.length);
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
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
    addAccessRequest,
  };
}
