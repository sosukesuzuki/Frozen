import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import TabBar from "./templates/TabBar";
import Renderer from "./templates/Renderer";
import SideNavigation from "./templates/SideNavigation";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, Action } from "redux";
import { init } from "../lib/redux/actionCreators/Root";
import WorkspaceModal from "./templates/WorkspaceModal";
import { State } from "../lib/redux/reducer";
import { dracula } from "../lib/colors";

const Container = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
`;
const ContentContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 30px 1fr;
  overflow-y: hidden;
  background-color: ${dracula.background};
  color: ${dracula.foreground};
`;

interface Props {
  currentWorkspaceId: string;
  init: () => Action;
}

const App: React.FC<Props> = ({ currentWorkspaceId, init }) => {
  useEffect(() => {
    init();
  }, []);

  const [isOpenWorkspaceModal, setIsOpenWorkspaceModal] = useState(false);
  const setIsOpenModal = useCallback(function(isOpen: boolean) {
    setIsOpenWorkspaceModal(isOpen);
  }, []);

  return (
    <Container>
      <SideNavigation
        openWorkspaceModal={() => {
          setIsOpenModal(true);
        }}
      />
      <ContentContainer>
        {currentWorkspaceId !== "" ? (
          <>
            <TabBar />
            <Renderer />
          </>
        ) : (
          <p>Please select a workspace.</p>
        )}
      </ContentContainer>
      <WorkspaceModal
        isOpen={isOpenWorkspaceModal}
        closeModal={() => {
          setIsOpenModal(false);
        }}
      />
    </Container>
  );
};

function mapStateToProps(state: State) {
  return {
    currentWorkspaceId: state.currentWorkspaceId
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    ...bindActionCreators({ init }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
