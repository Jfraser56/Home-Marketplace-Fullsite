import React from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/shared/Spinner";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
