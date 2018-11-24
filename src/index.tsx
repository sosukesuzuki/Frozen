import * as ReactDOM from "react-dom";
import * as React from "react";
import "normalize-css";
import "github-markdown-css";
import App from "./components/App";
import { generateFile } from "./lib/utils";
import { MarkdownFilesStore } from "./stores";
(async () => {
  const markdownFilesStore = new MarkdownFilesStore();
  await markdownFilesStore.init();
  if (markdownFilesStore.files.length === 0) {
    markdownFilesStore.addFile(generateFile(""), { setFile: true });
  }
  ReactDOM.render(
    <App markdownFilesStore={markdownFilesStore} />,
    document.querySelector(".root")
  );
})();
