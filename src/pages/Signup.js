import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Input } from "../components/Input";
import { FormWrapper } from "../components/FormWrapper";
import { Button } from "../components/Button";
import { LoginWrapper, StyledLink } from "./Login";

export default function Signup() {
  const { isAuthenticated, signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  function handleSignUp(event) {
    event.preventDefault();
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
    <LoginWrapper>
      <div>
        <h1>MY PERSONAL BOOKSHELF</h1>
        <FormWrapper onSubmit={handleSignUp}>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name"
          />
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <Input
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            type="password"
            placeholder="Confirm password"
          />
          <Button>Sign Up</Button>
          <StyledLink to="/">Already have an account?</StyledLink>
        </FormWrapper>
      </div>
    </LoginWrapper>
  );
}
