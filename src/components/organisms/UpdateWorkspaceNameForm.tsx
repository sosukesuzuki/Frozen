import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Workspace } from "../../lib/types";
import { Dispatch, Action as ReduxAction, bindActionCreators } from "redux";
import actionCreators, { Action } from "../../lib/redux/actionCreators";
import Input from "../atoms/Input";

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
      <Input
        autoFocus
        value={inputContent}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            updateWorkspace(workspace.id, inputContent, workspace.color);
            endEdit();
          }
        }}
        onChange={(e: ChangeEvent) => {
          const value = (e.target as any).value;
          setInputContent(value);
        }}
        onBlur={() => {
          endEdit();
        }}
      />
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
