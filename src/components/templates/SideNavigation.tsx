import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Workspace } from "../../lib/types";
import { State } from "../../lib/redux/reducer";
import { dracula } from "../../lib/colors";

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
}

const Renderer: React.FC<Props> = ({ workspaces }) => {
  return (
    <Container>
      {workspaces.map(workspace => (
        <WorkspaceIcon backgroundColor={workspace.color} />
      ))}
    </Container>
  );
};

export default connect((state: State) => ({
  workspaces: state.workspaces
}))(Renderer);