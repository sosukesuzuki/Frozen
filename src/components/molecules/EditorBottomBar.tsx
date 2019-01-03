import React, { useState } from "react";
import styled from "styled-components";
import { dracula } from "../../lib/colors";
import { countWords, countChar } from "../../lib/utils/Counter";

const Container = styled.div`
  font-family: Inconsolata;
  border-top: 1px solid ${dracula.foreground};
  display: flex;
  justify-content: space-between;
`;
const CounterText = styled.span`
  cursor: pointer;
`;

interface Props {
  keyBuffer: string;
  fileContent: string;
}

enum CountStatus {
  Char,
  Word
}

const EditorBottomBar: React.FC<Props> = ({ keyBuffer, fileContent }) => {
  const [countStatus, setCountStatus] = useState(CountStatus.Char);

  function toggleCountStatus() {
    if (countStatus === CountStatus.Char) {
      setCountStatus(CountStatus.Word);
    } else {
      setCountStatus(CountStatus.Char);
    }
  }

  return (
    <Container>
      <span>{keyBuffer}</span>
      <CounterText onClick={toggleCountStatus}>
        {countStatus === CountStatus.Char
          ? `Chars: ${countChar(fileContent)}`
          : `Words: ${countWords(fileContent)}`}
      </CounterText>
    </Container>
  );
};

export default EditorBottomBar;
