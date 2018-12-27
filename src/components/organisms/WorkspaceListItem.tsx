import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Workspace } from "../../lib/types";
import { Dispatch, Action, bindActionCreators } from "redux";
import actionCreators from "../../lib/redux/actionCreators";
import UpdateWorkspaceNameForm from "./UpdateWorkspaceNameForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../atoms/IconButton";
import { dracula } from "../../lib/colors";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${dracula.selection};
  padding: 10px;
  border-radius: 5px;
`;
const WorkspaceName = styled.p`
  margin: 0;
`;
const Buttons = styled.div``;

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
            const result = confirm(
              "Delete the workspace. You cannot revert this process."
            );
            if (result) deleteWorkspace(workspace.id);
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
        deleteWorkspace: actionCreators.deleteWorkspace
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(WorkspaceListItem);
