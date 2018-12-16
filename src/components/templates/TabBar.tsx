import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { MarkdownFile } from "../../lib/types";
import { generateFile } from "../../lib/utils";
import { dracula } from "../../lib/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import actionCreators, { Action } from "../../lib/redux/actionCreators";
import { State } from "../../lib/redux/reducer";
import { bindActionCreators } from "redux";
import { getFileFormFiles } from "../../lib/utils/getFileFromFiles";

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
const Tab = styled.div`
  height: 30px;
  cursor: pointer;
  line-height: 30px;
  transition: 0.1s;
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  min-width: 180px;
  background-color: ${dracula.selection};
  ${({ isCurrentFile }: { isCurrentFile: boolean }) =>
    isCurrentFile &&
    `
    background-color: rgba(193, 193, 193, 0.2);
  `}
  div {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 225px;
  }
  span {
    max-width: 250px;
    font-size: 13px;
  }
  svg {
    padding: 0 10px;
  }
`;
const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  font-weight: normal;
  outline: none;
  width: 25px;
  transition: 0.1s;
  color: ${dracula.foreground};
  &:hover {
    transition: 0.1s;
    font-weight: bold;
  }
`;
const AddButton = styled.button`
  border: none;
  background-color: transparent;
  font-weight: normal;
  height: 30px;
  width: 30px;
  outline: none;
  transition: 0.1s;
  color: ${dracula.foreground};
  &:hover {
    transition: 0.1s;
    font-weight: bold;
  }
`;

interface TabBarProps {
  files: MarkdownFile[];
  addFile: (file: MarkdownFile) => void;
  switchCurrentFile: (file: MarkdownFile) => Action;
  deleteFile: (file: MarkdownFile) => Action;
  file?: MarkdownFile;
}

const TabBar: React.SFC<TabBarProps> = ({
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
        <Tab key={file.id} isCurrentFile={file.id === currentFileId}>
          <div
            onClick={() => {
              switchCurrentFile(file);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faFile} />
              {file.title}
            </span>
          </div>
          <CloseButton
            onClick={() => {
              deleteFile(file);
            }}
          >
            &times;
          </CloseButton>
        </Tab>
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

export default connect(
  (state: State) => ({
    files: state.files,
    file: getFileFormFiles(state.currentFileId, state.files)
  }),
  dispatch => ({
    ...bindActionCreators(
      {
        addFile: actionCreators.addFile,
        deleteFile: actionCreators.deleteFile,
        switchCurrentFile: actionCreators.switchCurrentFile
      },
      dispatch
    )
  })
)(TabBar);
