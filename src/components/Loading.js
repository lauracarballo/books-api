import React from "react";
import styled, { keyframes } from "styled-components";

export default function Loading() {
  return (
    <LoadingWrapper>
      <Ellipsis>
        <Inline1 />
        <Inline2 />
        <Inline3 />
        <Inline4 />
      </Ellipsis>
    </LoadingWrapper>
  );
}

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
  position: relative;
`;

const Ellipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Inline = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

const spinner1 = keyframes`
0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const spinner3 = keyframes`
 0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const spinner2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const Inline1 = styled(Inline)`
  left: 8px;
  animation: ${spinner1} 0.6s infinite;
`;

const Inline2 = styled(Inline)`
  left: 8px;
  animation: ${spinner2} 0.6s infinite;
`;

const Inline3 = styled(Inline)`
  left: 32px;
  animation: ${spinner2} 0.6s infinite;
`;

const Inline4 = styled(Inline)`
  left: 56px;
  animation: ${spinner3} 0.6s infinite;
`;
