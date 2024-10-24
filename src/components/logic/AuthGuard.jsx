import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

//import { useAuth } from "../providers/AuthProvider";

import ROUTES from "../../stores/routes";
import useAccessRequests from "../../features/access/businessLogic/useAccessRequests";
import { ROLE_TYPES } from "../../stores/roleTypes";

export default function AuthGuard({ children, profile, technicalPersonOnly }) {
  let location = useLocation();

  //const { user } = useAuth();

  //const isAuthenticated = Boolean(user);

  const isAuthenticated = Boolean(profile);

  if (technicalPersonOnly && profile.role !== ROLE_TYPES.TECHNICAL_PERSON) {
    return <Navigate to="/coleccion" state={{ from: location }} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/coleccion" state={{ from: location }} replace />;
  }

  return children;
}
