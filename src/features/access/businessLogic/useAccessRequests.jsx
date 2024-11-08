import { useState, useCallback } from "react";

import useApi from "../../../dataAccess/useApi";
import {
  ACCESS_REQUESTS_URL,
  REQUEST_PENDING,
  REQUEST_PENDING_COUNT,
  REQUEST_APPROVE,
  REQUEST_REJECT,
} from "../../../config/accessURL";

export default function useAccessRequests() {
  const { apiWrapper } = useApi();
  const [pendingAccessRequests, setPendingAccessRequests] = useState([]);
  const [pendingAccessRequestCount, setPendingAccessRequestCount] = useState(
    []
  );

  const getPendingAccessRequests = useCallback(async () => {
    const response = await apiWrapper.get(REQUEST_PENDING);
    setPendingAccessRequests(response.data);
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
    const body = {
      orcid: accessRequest.orcid,
      about: accessRequest.about,
      academic: {
        names: accessRequest.names,
        father_last_name: accessRequest.father_last_name,
        mother_last_name: accessRequest.mother_last_name,
        state: accessRequest.state,
        major: accessRequest.major,
        city: accessRequest.city,
        college: accessRequest.college,
        position: accessRequest.position,
        degree: accessRequest.degree,
        user: {
          username: accessRequest.username,
          password: accessRequest.password,
          email: accessRequest.email,
        },
      },
    };
    return await apiWrapper.post(ACCESS_REQUESTS_URL, body);
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
