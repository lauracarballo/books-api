import { createGlobalStyle } from "styled-components";
import { primaryFont, secondaryFont, typeScale } from "./typography";
import { normalize } from "polished";

export const GlobalStyle = createGlobalStyle`
${normalize()}
html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
    margin: 0;
    font-family: ${primaryFont};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: url("/img/wallpaper.jpeg");
    background-size: cover;
    height: 100%;
    width: 100%;

    &:before {
          background-color: hsl(0deg 0% 0% / 22%);
          content: "";
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
}

ol, ul {
  list-style: none;
}

main {
  width: 90%;
  margin: 0 auto;
}

h1 {
  font-size: ${typeScale.header1};
  font-family: ${secondaryFont};
  color: #fff;
  letter-spacing: 0.05em;
  margin: 0; 
}

h2 {
  font-size: ${typeScale.header2};
  font-family: ${secondaryFont};
  color: #fff;
  letter-spacing: 0.05em;
  margin: 0;
}

h3 {
   font-size: ${typeScale.header3};
   font-family: ${secondaryFont};
   letter-spacing: 0.05em;
   margin: 0;
}

`;
