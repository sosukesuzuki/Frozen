import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Editor from "../organisms/Editor";
import Preview from "../organisms/Preview";
import { MarkdownFile } from "../../lib/types";
import { State } from "../../lib/redux/reducer";
import { dracula } from "../../lib/colors";
import { getFileById } from "../../lib/utils/getFileById";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
  background-color: ${dracula.background};
  color: ${dracula.foreground};
`;

interface Props {
  file: MarkdownFile | undefined;
}

const Renderer: React.FC<Props> = ({ file }) => {
  return (
    <Container>
      {file != null ? (
        <>
          <Editor file={file} />
          <Preview file={file} />
        </>
      ) : (
        <p>Please add a new tab.</p>
      )}
    </Container>
  );
};

function mapStateToProps(state: State) {
  return {
    file: getFileById(state.currentFileId, state.files)
  };
}

export default connect(mapStateToProps)(Renderer);
