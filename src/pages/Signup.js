import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Signup() {
  const { isAuthenticated, signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  function handleSignUp(event) {
    if (password === password1) {
      signUp(name, email, password);
    } else {
      alert("Passwords are not the same. Try again.");
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div>
        <h1>MY PERSONAL BOOKSHELF</h1>
        <div className="login__form">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="login__form-input"
            type="text"
            placeholder="name"
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="login__form-input"
            type="email"
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="login__form-input"
            type="password"
            placeholder="password"
          />
          <input
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            className="login__form-input"
            type="password"
            placeholder="confirm password"
          />
          <button onClick={handleSignUp} className="login__form-button">
            Sign Up
          </button>
          <Link className="login__form-link" to="/">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
