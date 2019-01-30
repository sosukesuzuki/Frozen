import React from "react";
import styled from "styled-components";
import Editor from "./Editor";
import Preview from "./Preview";
import { MarkdownFile } from "@lib/types";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
`;

interface Props {
  file: MarkdownFile;
}

const HalfEditor: React.FC<Props> = ({ file }) => {
  return (
    <Container>
      <Editor file={file} />
      <Preview file={file} />
    </Container>
  );
};

export default HalfEditor;
