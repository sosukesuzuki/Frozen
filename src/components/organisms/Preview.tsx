import React from "react";
import styled from "styled-components";
import { dracula } from "../../lib/colors";
import { MarkdownFile } from "../../lib/types";
import markdownProcessor from "../../lib/markdownProcessor";

const MarkdownContainer = styled.div`
  padding: 20px;
  background-color: ${dracula.selection};
  color: ${dracula.foreground};
  overflow-y: scroll;
  height: calc(100vh - 75px);
  font-size: 14px;
  a {
    color: ${dracula.pink};
  }
  pre {
    background-color: ${dracula.background};
  }
  code {
    background-color: ${dracula.background};
  }
  table {
    tr {
      background-color: ${dracula.selection};
    }
  }
`;

interface Props {
  file: MarkdownFile;
}

const Preview: React.SFC<Props> = ({ file }) => {
  return (
    <MarkdownContainer
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: markdownProcessor.processSync(file.content).toString()
      }}
    />
  );
};

export default Preview;
