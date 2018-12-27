import styled from "styled-components";
import { dracula } from "../../lib/colors";

export default styled.input`
  outline: none;
  background-color: ${dracula.background};
  color: ${dracula.foreground};
  border: none;
  padding: 5px;
  border-radius: 2px;
  height: 20px;
  line-height: 30px;
  &:focus {
    box-shadow: 0 0 0 3px ${dracula.green};
  }
`;
