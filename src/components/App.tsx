import React from 'react'
import styled from 'styled-components'
import TabBar from './templates/TabBar'
import Renderer from './templates/Renderer'

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 20px 1fr;
  overflow-y: hidden;
`

const App = () => (
  <Container>
    <TabBar />
    <Renderer />
  </Container>
)

export default App
