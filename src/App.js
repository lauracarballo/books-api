import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/auth";
import Signup from "./pages/Signup";
import SharedProfile from "./pages/UserProfile";
import PrivateRoute from "./PrivateRoute";

const IS_LOCAL = true;
const API_URL = IS_LOCAL
  ? "http://localhost:5000"
  : "https://mawxfs6gx5.execute-api.us-east-1.amazonaws.com";

export default function App() {
  const existingTokens = localStorage.getItem("token");

  const [isAuthenticated, setIsAuthenticated] = useState(
    existingTokens ? true : false
  );
  const [authToken, setAuthTokens] = useState(existingTokens);
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(isAuthenticated);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedProfile = await fetch(`${API_URL}/dev/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => res.json())
        .catch(() => logout());

      if (!storedProfile || !storedProfile.success) {
        logout();
      } else if (storedProfile.success) {
        setUsername(storedProfile.name);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, authToken]);

  async function login(email, password) {
    const response = await fetch(`${API_URL}/dev/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (response.success === true) {
      localStorage.setItem("token", response.token);
      setAuthTokens(response.token);
      setIsAuthenticated(true);
    }
  }

  async function signUp(name, email, password) {
    const response = await fetch(`${API_URL}/dev/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => res.json());

    if (response.success === true) {
      localStorage.setItem("token", response.token);
      setAuthTokens(response.token);
      setIsAuthenticated(true);
    }
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        username,
        login,
        logout,
        signUp,
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Router>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/:shareId" component={SharedProfile} />
            <PrivateRoute path="/" exact component={Home} />
          </Switch>
        </Router>
      )}
    </AuthContext.Provider>
  );
}

export const PageWrapper = styled.section`
  width: 90%;
  margin: 10px auto;
`;
