import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { MarkdownFile } from "../../lib/types";
import { State } from "../../lib/redux/reducer";
import markdownProcessor from "../../lib/markdownProcessor";
import { dracula } from "../../lib/colors";
import { bindActionCreators } from "redux";
import actionCreators, { Action } from "../../lib/redux/actionCreators";
import { getFileFormFiles } from "../../lib/utils/getFileFromFiles";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
  background-color: ${dracula.background};
  color: ${dracula.foreground};
`;
const Textarea = styled.textarea`
  resize: none;
  outline: none;
  background-color: ${dracula.background};
  color: ${dracula.cyan};
  height: calc(100vh - 75px);
  width: 100%;
  font-size: 15px;
  border: none;
`;
const MarkdownContainer = styled.div`
  padding: 20px;
  background-color: ${dracula.selection};
  color: ${dracula.foreground};
  overflow-y: scroll;
  height: calc(100vh - 75px);
  font-size: 14px;
  letter-spacing: 1px;
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
const TextareaContainer = styled.div`
  padding: 20px;
  background-color: ${dracula.background};
`;

interface Props {
  file: MarkdownFile | undefined;
  updateFile: (id: string, content: string) => Action;
}

const Renderer: React.SFC<Props> = ({ updateFile, file }) => {
  return (
    <Container>
      {file != null ? (
        <>
          <TextareaContainer>
            <Textarea
              className="editor"
              onChange={(e: React.ChangeEvent) => {
                updateFile(file.id, (e.target as HTMLTextAreaElement).value);
              }}
              value={file.content}
              autoFocus
            />
          </TextareaContainer>
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

export default connect(
  (state: State) => ({
    file: getFileFormFiles(state.currentFileId, state.files)
  }),
  dispatch => ({
    ...bindActionCreators({ updateFile: actionCreators.updateFile }, dispatch)
  })
)(Renderer);
