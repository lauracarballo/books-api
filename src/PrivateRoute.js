import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "./context/auth";
import Login from "./pages/Login";

function PrivateRoute({ component, ...props }) {
  const { isAuthenticated } = useAuth();

  return <Route {...props} component={isAuthenticated ? component : Login} />;
}

export default PrivateRoute;
