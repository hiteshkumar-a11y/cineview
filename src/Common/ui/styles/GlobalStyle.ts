import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    min-height: 100%;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font.body};
  }

  #root {
    width: 100%;
    max-width: none;
    text-align: left;
    border: none;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input {
    font: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }
`;