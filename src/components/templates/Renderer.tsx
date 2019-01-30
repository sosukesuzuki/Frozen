import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import HalfEditor from "../organisms/HalfEditor";
import FullEditor from "../organisms/FullEditor";
import { MarkdownFile } from "../../lib/types";
import { State, EditorMode } from "../../lib/redux/reducer";
import { dracula } from "../../lib/colors";
import { getFileById } from "../../lib/utils/getFileById";

const Container = styled.div`
  background-color: ${dracula.background};
  color: ${dracula.foreground};
`;

interface Props {
  file: MarkdownFile | undefined;
  editorMode: EditorMode;
}

const Renderer: React.FC<Props> = ({ file, editorMode }) => {
  return (
    <Container>
      {file != null ? (
        editorMode === "FULL" ? (
          <FullEditor file={file} />
        ) : (
          <HalfEditor file={file} />
        )
      ) : (
        <p>Please add a new tab.</p>
      )}
    </Container>
  );
};

function mapStateToProps(state: State) {
  return {
    file: getFileById(state.currentFileId, state.files),
    editorMode: state.editorMode
  };
}

export default connect(mapStateToProps)(Renderer);
