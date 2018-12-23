import React from "react";
import styled from "styled-components";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const WorkspaceModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h1>Workspaces</h1>
    </Modal>
  );
};

export default WorkspaceModal;
