import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/auth";
import { FormWrapper } from "../components/FormWrapper";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    login(email, password);
  }

  return (
    <LoginWrapper>
      <div>
        <h1>MY PERSONAL BOOKSHELF</h1>

        <FormWrapper onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button>Sign In</Button>

          <StyledLink to="/signup">Don't have an account?</StyledLink>
        </FormWrapper>
      </div>
    </LoginWrapper>
  );
}

export const LoginWrapper = styled.div`
  height: 95vh;
  position: relative;
  display: grid;
  place-items: center;
`;

export const StyledLink = styled(Link)`
  color: #523906;
  font-size: 15px;
  padding-top: 15px;

  &:focus {
    margin-top: 8px;
    padding: 5px;
    border: 2px solid transparent;
    outline: 3px solid #523906;
    outline-offset: 3px;
  }
`;
