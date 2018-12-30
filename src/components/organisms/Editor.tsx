import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { dracula } from "../../lib/colors";
import { MarkdownFile } from "../../lib/types";
import actionCreators, { Action } from "../../lib/redux/actionCreators";
import { bindActionCreators } from "redux";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/continuelist";
import "codemirror/mode/gfm/gfm";
import "codemirror/keymap/vim";

const cmOptions = {
  lineNumbers: true,
  mode: "gfm",
  theme: "github-light",
  lineWrapping: true,
  keyMap: "vim",
  extraKeys: {
    Enter: "newlineAndIndentContinueMarkdownList"
  }
};

const TextareaContainer = styled.div`
  padding: 20px;
  background-color: ${dracula.background};
`;
const Textarea = styled.textarea`
  resize: none;
  outline: none;
  background-color: ${dracula.background};
  color: ${dracula.cyan};
  height: calc(100vh - 75px);
  width: 100%;
  font-size: 15px;
  border: none;
`;

interface Props {
  file: MarkdownFile;
  updateFile: (id: string, content: string) => Action;
}

const Editor: React.FC<Props> = ({ file, updateFile }) => {
  return (
    <TextareaContainer>
      <Textarea
        className="editor"
        onChange={(e: React.ChangeEvent) => {
          updateFile(file.id, (e.target as HTMLTextAreaElement).value);
        }}
        value={file.content}
        autoFocus
      />
    </TextareaContainer>
  );
};

export default connect(
  null,
  dispatch => ({
    ...bindActionCreators({ updateFile: actionCreators.updateFile }, dispatch)
  })
)(Editor);
