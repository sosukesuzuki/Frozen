import React from "react";
import styled from "styled-components";
import { MarkdownFile } from "../../lib/types";
import { inject, observer } from "mobx-react";
import Stores from "../../stores";
import { markdownProcessor } from "../../lib/utils";
import reactRenderer from "remark-react";
import { dracula } from "../../lib/colors";

interface RendererProps {
  file?: MarkdownFile;
  updateFile?: (value: { content: string; id: string }) => void;
}

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
  a {
    color: ${dracula.pink};
  }
  pre {
    background-color: ${dracula.background};
  }
`;
const TextareaContainer = styled.div`
  padding: 20px;
  background-color: ${dracula.background};
`;

const Renderer: React.SFC<RendererProps> = ({ updateFile, file }) => {
  return (
    <Container>
      {file != null ? (
        <>
          <TextareaContainer>
            <Textarea
              className="editor"
              onChange={(e: React.ChangeEvent) => {
                updateFile!({
                  content: (e.target as HTMLTextAreaElement).value,
                  id: file!.id
                });
              }}
              value={file!.content}
              autoFocus
            />
          </TextareaContainer>
          <MarkdownContainer className="markdown-body">
            {
              markdownProcessor()
                .use(reactRenderer)
                .processSync(file!.content).contents
            }
          </MarkdownContainer>
        </>
      ) : (
        <p>Please add a new tab.</p>
      )}
    </Container>
  );
};

export default inject((stores: Stores) => ({
  file: stores.markdownFilesStore.file,
  updateFile: stores.markdownFilesStore.updateFile
}))(observer(Renderer));
