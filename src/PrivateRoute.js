import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "./context/auth";
import Login from "./pages/Login";

function PrivateRoute({ component, ...rest }) {
  const { isLoggedIn } = useAuth();

  return <Route {...rest} component={isLoggedIn ? component : Login} />;
}

export default PrivateRoute;
