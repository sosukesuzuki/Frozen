import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Workspace } from "../../lib/types";
import { Dispatch, Action, bindActionCreators } from "redux";
import actionCreators from "../../lib/redux/actionCreators";
import UpdateWorkspaceNameForm from "./UpdateWorkspaceNameForm";

const Container = styled.div`
  display: flex;
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
        <p>{workspace.name}</p>
      )}
      <button
        onClick={() => {
          setIsEditting(true);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          const result = confirm(
            "Delete the workspace. You cannot revert this process."
          );
          if (result) deleteWorkspace(workspace.id);
        }}
      >
        Delete
      </button>
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
