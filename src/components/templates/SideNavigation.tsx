import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Workspace } from "../../lib/types";
import { State } from "../../lib/redux/reducer";
import { dracula } from "../../lib/colors";
import { Dispatch, Action, bindActionCreators } from "redux";
import actionCreators from "../../lib/redux/actionCreators";
import IconButton from "../atoms/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

interface WorkspaceIconProps {
  backgroundColor: string;
  isCurrentWorkspace: boolean;
}

const Container = styled.div`
  background-color: ${dracula.selection};
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const WorkspaceIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin: 10px auto;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ backgroundColor }: WorkspaceIconProps) =>
    backgroundColor};
  ${({ isCurrentWorkspace }: WorkspaceIconProps) =>
    isCurrentWorkspace &&
    `
    box-shadow: 0 0 0 4px ${dracula.orange};
  `}
`;
const CongigurationButton = styled(IconButton)`
  &:hover {
    svg {
      transform: rotate(-45deg);
    }
  }
`;

interface Props {
  workspaces: Workspace[];
  currentWorkspaceId: string;
  openWorkspaceModal: () => void;
  switchWorkspace: (workspaceId: string) => Action;
}

const Renderer: React.FC<Props> = ({
  workspaces,
  currentWorkspaceId,
  openWorkspaceModal,
  switchWorkspace
}) => {
  return (
    <Container>
      <div>
        {workspaces.map(workspace => (
          <WorkspaceIcon
            isCurrentWorkspace={currentWorkspaceId === workspace.id}
            key={workspace.id}
            backgroundColor={workspace.color}
            onClick={() => {
              switchWorkspace(workspace.id);
            }}
          >
            {workspace.name.charAt(0)}
          </WorkspaceIcon>
        ))}
      </div>
      <CongigurationButton onClick={openWorkspaceModal}>
        <FontAwesomeIcon icon={faCog} />
      </CongigurationButton>
    </Container>
  );
};

function mapStateToProps(state: State) {
  return {
    currentWorkspaceId: state.currentWorkspaceId,
    workspaces: state.workspaces
  };
}

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
  mapStateToProps,
  mapDispatchToProps
)(Renderer);
