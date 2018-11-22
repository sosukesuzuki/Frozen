import React from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import Stores from "../../stores";
import { MarkdownFile } from "../../lib/types";
import { generateFile } from "../../lib/utils";
import { grey } from "../../lib/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  color: ${grey[6]};
`;
const Tab = styled.div`
  height: 30px;
  cursor: pointer;
  border-right: 1px solid ${grey[3]};
  line-height: 30px;
  transition: 0.1s;
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  min-width: 180px;
  ${({ isCurrentFile }: { isCurrentFile: boolean }) =>
    isCurrentFile &&
    `
    background-color: ${grey[1]};
  `}
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  svg {
    padding: 0 10px;
  }
  &:hover {
    transition: 0.1s;
    background-color: #fafafa;
  }
`;
const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  font-weight: normal;
  outline: none;
  width: 25px;
  transition: 0.1s;
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
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    background-color: ${grey[1]};
  }
`;

interface TabBarProps {
  files?: MarkdownFile[];
  addFile?: (file: MarkdownFile) => void;
  setCurrentFile?: (file: MarkdownFile) => void;
  removeFile?: (file: MarkdownFile) => void;
  file?: MarkdownFile;
}

const TabBar: React.SFC<TabBarProps> = ({
  files,
  addFile,
  setCurrentFile,
  removeFile,
  file
}) => {
  const currentFileId = file! == null ? "NOTHING" : file!.id;
  return (
    <Container>
      {files!.map(file => (
        <Tab
          key={file.id}
          onClick={() => setCurrentFile!(file)}
          isCurrentFile={file.id === currentFileId}
        >
          <span>
            <FontAwesomeIcon icon={faFile} />
            {file.title}
          </span>
          <CloseButton
            onClick={() => {
              removeFile!(file);
            }}
          >
            &times;
          </CloseButton>
        </Tab>
      ))}
      <AddButton
        onClick={() => {
          const newFile = generateFile("");
          addFile!(newFile);
          setCurrentFile!(newFile);
        }}
      >
        <div>+</div>
      </AddButton>
    </Container>
  );
};

export default inject((stores: Stores) => ({
  files: stores.markdownFilesStore.files,
  addFile: stores.markdownFilesStore.addFile,
  removeFile: stores.markdownFilesStore.removeFile,
  setCurrentFile: stores.markdownFilesStore.setCurrentFileFromFile,
  file: stores.markdownFilesStore.file
}))(observer(TabBar));
