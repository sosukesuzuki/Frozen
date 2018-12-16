import * as ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import "normalize-css";
import "github-markdown-css";
import "katex/dist/katex.min.css";
import App from "./components/App";
import store from "./lib/redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".root")
);
