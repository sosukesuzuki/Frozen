import * as ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import "normalize-css";
import "github-markdown-css";
import "katex/dist/katex.min.css";
import { createGlobalStyle } from "styled-components";
import App from "./components/App";
import store from "./lib/redux/store";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: NotoSansJP;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>,
  document.querySelector("#root")
);
