import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Books from "./Books";
import Loading from "./Loading";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext, useAuth } from "../context/auth";

import Signup from "../pages/Signup";
// import UserProfile from "../pages/UserProfile";
import PrivateRoute from "../PrivateRoute";

const IS_LOCAL = true;
const API_URL = IS_LOCAL
  ? "http://localhost:5000"
  : "https://mawxfs6gx5.execute-api.us-east-1.amazonaws.com";

function BookLists() {
  const { authToken, isAuthenticated, username } = useAuth();

  const [lists, setLists] = useState({
    wishlist: [],
    books: [],
  });
  const [value, setValue] = useState("EDIT");
  const [remove, setRemove] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const fetchLists = async () => {
    const storedLists = await fetch(`${API_URL}/dev/lists`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => res.json());

    console.log(storedLists);

    if (storedLists.success) {
      setLists(storedLists.lists);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const saveLists = async () => {
      await fetch(`${API_URL}/dev/save`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lists }),
      });
    };
    if (isAuthenticated && !isLoading) {
      saveLists();
    }
  }, [isAuthenticated, lists, authToken, isLoading]);

  function handleEdit() {
    if (remove === false) {
      setRemove(true);
      setValue("DONE");
    } else {
      setRemove(false);
      setValue("EDIT");
    }
  }

  return (
    <PageWrapper>
      <Header
        username={username}
        setLists={setLists}
        handleEdit={handleEdit}
        value={value}
      />
      <Books setLists={setLists} lists={lists} remove={remove} />
    </PageWrapper>
  );
}

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

      console.log({ storedProfile });

      if (!storedProfile && storedProfile === undefined) {
        logout();
      } else if (storedProfile.success) {
        setUsername(storedProfile.name);
        setIsAuthenticated(true);
        setLoading(false);
      }
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
            {/* <Route path="/:shareId" component={UserProfile} /> */}
            <PrivateRoute path="/" exact component={BookLists} />
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
