import * as ReactDOM from "react-dom";
import * as React from "react";
import "normalize-css";
import "github-markdown-css";
import "katex/dist/katex.min.css";
import App from "./components/App";
import { MarkdownFilesStore } from "./stores";

(async () => {
  const markdownFilesStore = new MarkdownFilesStore();
  await markdownFilesStore.init();
  ReactDOM.render(
    <App markdownFilesStore={markdownFilesStore} />,
    document.querySelector(".root")
  );
})();
