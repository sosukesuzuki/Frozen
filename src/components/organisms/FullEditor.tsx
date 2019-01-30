import React from "react";
import styled from "styled-components";
import { MarkdownFile } from "@lib/types";
import Editor from "./Editor";
import Preview from "./Preview";

const Container = styled.div``;

interface Props {
  file: MarkdownFile;
}

const FullEditor: React.FC<Props> = ({ file }) => {
  const [isEditor, setIsEditor] = React.useState(false);
  function toggleIsEditor(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setIsEditor(!isEditor);
  }
  return (
    <Container onContextMenu={toggleIsEditor}>
      {isEditor ? <Editor file={file} /> : <Preview file={file} />}
    </Container>
  );
};

export default FullEditor;
