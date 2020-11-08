import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    login(email, password);
  }

  return (
    <div className="login">
      <div>
        <h1>MY PERSONAL BOOKSHELF</h1>

        <div className="login__form">
          <input
            value={email}
            className="login__form-input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email"
          />
          <input
            value={password}
            className="login__form-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button onClick={handleLogin} className="login__form-button">
            Sign In
          </button>

          <Link className="login__form-input" to="/signup">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
