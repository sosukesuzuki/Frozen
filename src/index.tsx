import * as ReactDOM from "react-dom";
import * as React from "react";
import "normalize-css";
import "github-markdown-css";
import App from "./components/App";
(async () => {
  ReactDOM.render(<App />, document.querySelector(".root"));
})();
