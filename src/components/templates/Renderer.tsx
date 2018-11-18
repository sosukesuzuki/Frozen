import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
`

const Renderer = () => (
  <Container>
    <div></div>
    <div></div>
  </Container>
)

export default Renderer
