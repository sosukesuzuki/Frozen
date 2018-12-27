import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Workspace } from "../../lib/types";
import actionCreators, { Action } from "../../lib/redux/actionCreators";
import { connect } from "react-redux";
import { Dispatch, Action as ReduxAction, bindActionCreators } from "redux";
import { generateWorkspace } from "../../lib/utils/generateWorkspace";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const Container = styled.div`
  display: flex;
`;
const AddWorkspaceInput = styled(Input)`
  width: 100%;
  margin-right: 10px;
`;

interface Props {
  addWorkspace: (workspace: Workspace) => Action;
}

const AddWorkspaceForm: React.FC<Props> = ({ addWorkspace }) => {
  const [inputContent, setInputContent] = useState("");
  return (
    <Container>
      <AddWorkspaceInput
        value={inputContent}
        placeholder="Enter a new workspace name..."
        onChange={(e: ChangeEvent) => {
          const value = (e.target as any).value;
          setInputContent(value);
        }}
      />
      <Button
        onClick={() => {
          const workspace = generateWorkspace(inputContent);
          addWorkspace(workspace);
        }}
      >
        Add
      </Button>
    </Container>
  );
};

function mapDispatchToProps(dispatch: Dispatch<ReduxAction<any>>) {
  return {
    ...bindActionCreators(
      {
        addWorkspace: actionCreators.addWorkspace
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddWorkspaceForm);
