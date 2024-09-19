import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

//import { useAuth } from "../providers/AuthProvider";

import ROUTES from "../../stores/routes";
import useAccessRequests from "../../features/access/businessLogic/useAccessRequests";

export default function AuthGuard({ children }) {
  let location = useLocation();

  //const { user } = useAuth();

  //const isAuthenticated = Boolean(user);

  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
