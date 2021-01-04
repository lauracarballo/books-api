import React from "react";
import styled from "styled-components";

export default function SelectedBooks({ select, setSelect }) {
  return (
    <div>
      {select ? (
        <SelectedBookWrapper
          onClick={() => {
            setSelect(false);
          }}
        >
          <SelectedBook>
            {select.image && <SelectedBookImage src={select.image} alt="" />}
            <SelectedBookDescription>
              <h2>{select.title}</h2>
              <h3>{select.authors.join(", ")}</h3>
              <br />
              <div>{select.description}</div>
            </SelectedBookDescription>
          </SelectedBook>
        </SelectedBookWrapper>
      ) : null}
    </div>
  );
}

export const SelectedBookWrapper = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
`;

export const SelectedBook = styled.div`
  display: flex;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  color: #000;
  width: 70%;
  background-color: #fff;
  position: relative;
  top: 120px;
  left: 160px;
  height: 400px;
  border-radius: 2px;
  z-index: 0;
`;

export const SelectedBookImage = styled.img`
  width: 20%;
  height: 80%;
  padding-top: 30px;
`;

export const SelectedBookDescription = styled.div`
  padding-left: 40px;
  max-width: 75%;
  max-height: 90%;
  overflow: scroll;
`;
