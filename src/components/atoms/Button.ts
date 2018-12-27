import styled from "styled-components";
import { dracula } from "../../lib/colors";

export default styled.button`
  outline: none;
  border: none;
  background-color: ${dracula.selection};
  color: ${dracula.foreground};
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background-color: ${dracula.background};
  }
`;
