import React from "react";
import Modal from "react-modal";
import AddWorkspaceForm from "../organisms/AddWorkspaceForm";
import WorkspaceList from "../organisms/WorkspaceList";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const WorkspaceModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h1>Workspaces</h1>
      <WorkspaceList />
      <AddWorkspaceForm />
    </Modal>
  );
};

export default WorkspaceModal;
