import React from "react";
import styled from "styled-components";
import { Provider } from "mobx-react";
import TabBar from "./templates/TabBar";
import Renderer from "./templates/Renderer";
import { MarkdownFilesStore } from "../stores";

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 30px 1fr;
  overflow-y: hidden;
`;

const App: React.SFC<{ markdownFilesStore: MarkdownFilesStore }> = ({
  markdownFilesStore
}) => {
  return (
    <Provider markdownFilesStore={markdownFilesStore}>
      <Container>
        <TabBar />
        <Renderer />
      </Container>
    </Provider>
  );
};

export default App;
