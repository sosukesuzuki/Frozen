import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Workspace } from "../../lib/types";
import { State } from "../../lib/redux/reducer";
import { dracula } from "../../lib/colors";
import { Dispatch, Action, bindActionCreators } from "redux";
import actionCreators from "../../lib/redux/actionCreators";

const Container = styled.div`
  background-color: ${dracula.selection};
  padding: 10px 0;
`;
const WorkspaceIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin: 0 auto;
  cursor: pointer;
  background-color: ${({ backgroundColor }: { backgroundColor: string }) =>
    backgroundColor};
`;

interface Props {
  workspaces: Workspace[];
  openWorkspaceModal: () => void;
  switchWorkspace: (workspaceId: string) => Action;
}

const Renderer: React.FC<Props> = ({
  workspaces,
  openWorkspaceModal,
  switchWorkspace
}) => {
  return (
    <Container>
      {workspaces.map(workspace => (
        <WorkspaceIcon
          key={workspace.id}
          backgroundColor={workspace.color}
          onClick={() => {
            switchWorkspace(workspace.id);
          }}
        >
          {workspace.name}
        </WorkspaceIcon>
      ))}
      <button onClick={openWorkspaceModal}>Configuration</button>
    </Container>
  );
};

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    ...bindActionCreators(
      {
        switchWorkspace: actionCreators.switchWorkspace
      },
      dispatch
    )
  };
}

export default connect(
  (state: State) => ({
    workspaces: state.workspaces
  }),
  mapDispatchToProps
)(Renderer);
