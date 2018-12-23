import React from "react";
import Modal from "react-modal";
import AddWorkspaceForm from "../organisms/AddWorkspaceForm";
import WorkspaceList from "../organisms/WorkspaceList";
import { dracula } from "../../lib/colors";

Modal.setAppElement("#root");

const style = {
  content: {
    background: dracula.selection,
    color: dracula.foreground
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
};

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const WorkspaceModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={style}>
      <h1>Workspaces</h1>
      <WorkspaceList />
      <AddWorkspaceForm />
    </Modal>
  );
};

export default WorkspaceModal;
