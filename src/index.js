import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "./utils/Global";

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
