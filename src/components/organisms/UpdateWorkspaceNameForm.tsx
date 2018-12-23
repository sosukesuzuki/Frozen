import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Workspace } from "../../lib/types";
import { Dispatch, Action as ReduxAction, bindActionCreators } from "redux";
import actionCreators, { Action } from "../../lib/redux/actionCreators";

const Container = styled.div``;

interface Props {
  workspace: Workspace;
  updateWorkspace: (id: string, name: string, color: string) => Action;
  endEdit: () => void;
}

const UpdateWorkspaceNameForm: React.FC<Props> = ({
  workspace,
  updateWorkspace,
  endEdit
}) => {
  const [inputContent, setInputContent] = useState(workspace.name);
  return (
    <Container>
      <input
        value={inputContent}
        onChange={(e: ChangeEvent) => {
          const value = (e.target as any).value;
          setInputContent(value);
        }}
      />
      <button
        onClick={() => {
          updateWorkspace(workspace.id, inputContent, workspace.color);
          endEdit();
        }}
      >
        Update
      </button>
    </Container>
  );
};

function mapDispatchToProps(dispatch: Dispatch<ReduxAction<any>>) {
  return {
    ...bindActionCreators(
      {
        updateWorkspace: actionCreators.updateWorkspace
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(UpdateWorkspaceNameForm);
