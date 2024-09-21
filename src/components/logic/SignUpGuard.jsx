import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

import ROUTES from "../../stores/routes";
import useAccessRequests from "../../features/access/businessLogic/useAccessRequests";

export default function SignUpGuard({ children }) {
  const location = useLocation();
  const { token } = useParams();
  const [tokenIsValid, setTokenIsValid] = useState(null);

  const [
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
    addAccessRequest,
    verifyAccessRequestToken,
  ] = useAccessRequests();

  const isTryingToSeeSignUpForm = location.pathname.includes(
    ROUTES.REGISTRARSE
  );

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token && tokenIsValid === null) {
        const isValid = await verifyAccessRequestToken(token);
        setTokenIsValid(isValid);
      }
    };

    checkTokenValidity();
  }, [token]);

  console.log(tokenIsValid);
  if (isTryingToSeeSignUpForm && tokenIsValid === false) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (isTryingToSeeSignUpForm && tokenIsValid === null) {
    return <div>Loading...</div>;
  }

  return children;
}
