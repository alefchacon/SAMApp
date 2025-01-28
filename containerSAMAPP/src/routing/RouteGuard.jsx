import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROLE_TYPES } from "../stores/roleTypes";
import { pathPrefix } from "./backendRoutes";
export default function RouteGuard({
  children,
  profile,
  technicalPersonOnly,
  visitorOnly,
}) {
  let location = useLocation();

  const isAuthenticated = profile.role !== ROLE_TYPES.VISITOR;

  if (visitorOnly && isAuthenticated) {
    return <Navigate to={pathPrefix} state={{ from: location }} replace />;
  }

  if (technicalPersonOnly && profile.role !== ROLE_TYPES.TECHNICAL_PERSON) {
    return <Navigate to={pathPrefix} state={{ from: location }} replace />;
  }

  if (!isAuthenticated && !visitorOnly) {
    return <Navigate to={pathPrefix} state={{ from: location }} replace />;
  }

  return children;
}
