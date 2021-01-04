import styled from "styled-components";
import { primaryFont, typeScale } from "../utils/typography";

export const Button = styled.button`
  font-size: ${typeScale.helperText};
  font-family: ${primaryFont};
  display: block;
  background-color: #a48972;
  border: 2px solid #523906;
  box-shadow: 8px 0px 8px #523906;
  border-radius: 5px;
  color: #fff;
  padding: 8px;
  cursor: pointer;

  &:focus {
    border: 2px solid transparent;
    outline: 3px solid #523906;
    outline-offset: 3px;
    box-shadow: none;
  }
`;

export const DeleteButton = styled(Button)`
  border-radius: 15px;
  padding: 2px 6px;
`;
