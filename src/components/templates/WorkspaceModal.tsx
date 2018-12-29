import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import AddWorkspaceForm from "../molecules/AddWorkspaceForm";
import WorkspaceList from "../organisms/WorkspaceList";
import { dracula } from "../../lib/colors";

Modal.setAppElement("#root");

const style = {
  content: {
    background: dracula.selection,
    color: dracula.foreground,
    padding: "40px",
    maxWidth: "700px",
    maxHeight: "600px",
    top: "0",
    bottom: "0",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
};

const ModalTitle = styled.h1`
  margin: 0;
`;

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const WorkspaceModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={style}>
      <div>
        <ModalTitle>Workspaces</ModalTitle>
        <WorkspaceList />
      </div>
      <AddWorkspaceForm />
    </Modal>
  );
};

export default WorkspaceModal;
