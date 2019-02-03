import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { MarkdownFile } from "../../lib/types";
import { generateFile } from "../../lib/utils/ItemGenerator";
import { dracula } from "../../lib/colors";
import { Action } from "../../lib/redux/types";
import { addFile, deleteFile } from "@lib/redux/actionCreators/Files";
import { switchCurrentFile } from "@lib/redux/actionCreators/CurrentFile";
import { State } from "../../lib/redux/reducer";
import { bindActionCreators, Dispatch, Action as ReduxAction } from "redux";
import { getFileById } from "../../lib/utils/getFileById";
import IconButton from "../atoms/IconButton";
import Tab from "../molecules/Tab";

const Container = styled.div`
  display: flex;
  color: ${dracula.foreground};
  background-color: ${dracula.selection};
  overflow-x: auto;
  overflow-y: hidden;
  height: 40px; /* 30px of tabs + 10px of scrollbar */
  &::-webkit-scrollbar {
    height: 10px;
    background: ${dracula.scrollBarBackground};
  }
  &::-webkit-scrollbar-thumb {
    background: ${dracula.scrollBarThumb};
  }
`;
const AddButton = styled(IconButton)`
  height: 30px;
  width: 30px;
`;

interface Props {
  files: MarkdownFile[];
  addFile: (file: MarkdownFile) => void;
  switchCurrentFile: (file: MarkdownFile) => Action;
  deleteFile: (file: MarkdownFile) => Action;
  file?: MarkdownFile;
}

const TabBar: React.FC<Props> = ({
  files,
  addFile,
  switchCurrentFile,
  deleteFile,
  file
}) => {
  const currentFileId = file == null ? "NOTHING" : file.id;
  return (
    <Container>
      {files.map(file => (
        <Tab
          key={file.id}
          file={file}
          deleteFile={deleteFile}
          switchCurrentFile={switchCurrentFile}
          currentFileId={currentFileId}
        />
      ))}
      <AddButton
        onClick={() => {
          const newFile = generateFile("");
          addFile(newFile);
          switchCurrentFile(newFile);
        }}
      >
        <div>+</div>
      </AddButton>
    </Container>
  );
};

function mapStateToProps(state: State) {
  return {
    files: state.files,
    file: getFileById(state.currentFileId, state.files)
  };
}

function mapDispatchToProps(dispatch: Dispatch<ReduxAction<any>>) {
  return {
    ...bindActionCreators(
      {
        addFile: addFile,
        deleteFile: deleteFile,
        switchCurrentFile: switchCurrentFile
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBar);
