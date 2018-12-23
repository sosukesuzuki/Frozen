import React, { useEffect } from "react";
import styled from "styled-components";
import TabBar from "./templates/TabBar";
import Renderer from "./templates/Renderer";
import SideNavigation from "./templates/SideNavigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators, { ActionTypes } from "../lib/redux/actionCreators";

const Container = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  height: 100vh;
  overflow-y: hidden;
`;
const ContentContainer = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 30px 1fr;
  overflow-y: hidden;
`;

interface Props {
  init: () => { type: ActionTypes.INIT };
}

const App: React.FC<Props> = ({ init }) => {
  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <SideNavigation />
      <ContentContainer>
        <TabBar />
        <Renderer />
      </ContentContainer>
    </Container>
  );
};

export default connect(
  null,
  dispatch => ({
    ...bindActionCreators({ init: actionCreators.init }, dispatch)
  })
)(App);
