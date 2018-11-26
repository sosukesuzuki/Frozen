import * as ReactDOM from "react-dom";
import * as React from "react";
import "normalize-css";
import "github-markdown-css";
import "katex/dist/katex.min.css";
import App from "./components/App";
import { generateFile } from "./lib/utils";
import { MarkdownFilesStore } from "./stores";
import { getIsFirstAccess, setIsFirstAccess } from "./lib/localStorage";
import readmeString from "./lib/readmeString";

(async () => {
  const markdownFilesStore = new MarkdownFilesStore();
  await markdownFilesStore.init();
  if (markdownFilesStore.files.length === 0 && getIsFirstAccess() == null) {
    setIsFirstAccess();
    markdownFilesStore.addFile(generateFile(readmeString), { setFile: true });
  }
  ReactDOM.render(
    <App markdownFilesStore={markdownFilesStore} />,
    document.querySelector(".root")
  );
})();
