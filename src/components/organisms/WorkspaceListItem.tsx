import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Workspace } from "../../lib/types";
import { Dispatch, Action, bindActionCreators } from "redux";
import { deleteWorkspace } from "../../lib/redux/actionCreators/Workspace";
import UpdateWorkspaceNameForm from "../molecules/UpdateWorkspaceNameForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../atoms/IconButton";
import { dracula } from "../../lib/colors";
import alertConfirm from "@lib/utils/alertConfirm";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${dracula.selection};
  padding: 10px;
  height: 30px;
`;
const WorkspaceName = styled.p`
  margin: 0;
  height: 30px;
  line-height: 30px;
`;
const Buttons = styled.div`
  display: flex;
  width: 60px;
  padding: 0 10px;
`;

interface Props {
  workspace: Workspace;
  deleteWorkspace: (id: string) => Action;
}

const WorkspaceListItem: React.FC<Props> = ({ workspace, deleteWorkspace }) => {
  const [isEditting, setIsEditting] = useState(false);
  return (
    <Container>
      {isEditting ? (
        <UpdateWorkspaceNameForm
          workspace={workspace}
          endEdit={() => setIsEditting(false)}
        />
      ) : (
        <WorkspaceName>{workspace.name}</WorkspaceName>
      )}
      <Buttons>
        <IconButton
          onClick={() => {
            setIsEditting(true);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
        <IconButton
          onClick={() => {
            alertConfirm(
              "Delete the workspace. You cannot revert this process.",
              () => deleteWorkspace(workspace.id)
            );
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      </Buttons>
    </Container>
  );
};

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    ...bindActionCreators(
      {
        deleteWorkspace
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(WorkspaceListItem);
