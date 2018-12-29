import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Workspace } from "../../lib/types";
import { State } from "../../lib/redux/reducer";
import WorkspaceListItem from "./WorkspaceListItem";

const Container = styled.div`
  margin: 10px 0;
  overflow-y: scroll;
  height: 500px;
  margin-left: 15px;
`;

interface Props {
  workspaces: Workspace[];
}

const WorkspaceList: React.FC<Props> = ({ workspaces }) => {
  return (
    <Container>
      {workspaces.map(workspace => (
        <WorkspaceListItem workspace={workspace} key={workspace.id} />
      ))}
    </Container>
  );
};

function mapStateToProps(state: State) {
  return {
    workspaces: state.workspaces
  };
}

export default connect(mapStateToProps)(WorkspaceList);
