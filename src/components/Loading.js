import React from "react";
import styled from "styled-components";

export const LoadingWrapper = styled.section`
  display: flex;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  color: #000;
  width: 70%;
  position: relative;
  top: 120px;
  left: 160px;
  height: 400px;
  border-radius: 2px;
  z-index: 0;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <span role="img" aria-labelledby="emoji">
        📖
      </span>
    </LoadingWrapper>
  );
}
