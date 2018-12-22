import React from "react";
import styled from "styled-components";
import IconButton from "../atoms/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { dracula } from "../../lib/colors";
import { MarkdownFile } from "../../lib/types";
import { Action } from "../../lib/redux/actionCreators";

const Container = styled.div`
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
const CloseButton = styled(IconButton)`
  width: 25px;
`;

interface Props {
  file: MarkdownFile;
  currentFileId: string;
  switchCurrentFile: (file: MarkdownFile) => Action;
  deleteFile: (file: MarkdownFile) => Action;
}

const Tab: React.FC<Props> = ({
  file,
  currentFileId,
  switchCurrentFile,
  deleteFile
}) => {
  return (
    <Container isCurrentFile={file.id === currentFileId}>
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
    </Container>
  );
};

export default Tab;
