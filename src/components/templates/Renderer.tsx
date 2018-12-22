import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Editor from "../organisms/Editor";
import { MarkdownFile } from "../../lib/types";
import { State } from "../../lib/redux/reducer";
import markdownProcessor from "../../lib/markdownProcessor";
import { dracula } from "../../lib/colors";
import { getFileFormFiles } from "../../lib/utils/getFileFromFiles";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
  background-color: ${dracula.background};
  color: ${dracula.foreground};
`;
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
  file: MarkdownFile | undefined;
}

const Renderer: React.SFC<Props> = ({ file }) => {
  return (
    <Container>
      {file != null ? (
        <>
          <Editor file={file} />
          <MarkdownContainer
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: markdownProcessor.processSync(file.content).toString()
            }}
          />
        </>
      ) : (
        <p>Please add a new tab.</p>
      )}
    </Container>
  );
};

export default connect((state: State) => ({
  file: getFileFormFiles(state.currentFileId, state.files)
}))(Renderer);
