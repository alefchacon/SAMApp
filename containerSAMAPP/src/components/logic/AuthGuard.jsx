import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROLE_TYPES } from "../../stores/roleTypes";

export default function AuthGuard({
  children,
  profile,
  technicalPersonOnly,
  visitorOnly,
}) {
  let location = useLocation();

  const isAuthenticated = profile.role !== ROLE_TYPES.VISITOR;

  if (visitorOnly && isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (technicalPersonOnly && profile.role !== ROLE_TYPES.TECHNICAL_PERSON) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAuthenticated && !visitorOnly) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
