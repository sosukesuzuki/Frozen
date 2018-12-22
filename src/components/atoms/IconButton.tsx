import styled from "styled-components";
import { dracula } from "../../lib/colors";

export default styled.button`
  border: none;
  background-color: transparent;
  font-weight: normal;
  outline: none;
  transition: 0.1s;
  color: ${dracula.foreground};
  &:hover {
    transition: 0.1s;
    font-weight: bold;
  }
`;
