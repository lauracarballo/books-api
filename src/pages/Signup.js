import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="login">
      <div>
        <h1>MY PERSONAL BOOKSHELF</h1>
        <form className="login__form">
          <input
            className="login__form-input"
            type="email"
            placeholder="email"
          />
          <input
            className="login__form-input"
            type="password"
            placeholder="password"
          />
          <input
            className="login__form-input"
            type="password"
            placeholder="password"
          />
          <button className="login__form-button">Sign Up</button>
          <Link className="login__form-input" to="/login">
            Already have an account??
          </Link>
        </form>
      </div>
    </div>
  );
}
