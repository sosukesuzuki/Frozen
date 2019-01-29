import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Dispatch, Action } from "redux";
import styled from "styled-components";
import { connect } from "react-redux";
import { dracula } from "../../lib/colors";
import { MarkdownFile } from "../../lib/types";
import actionCreators from "../../lib/redux/actionCreators";
import { bindActionCreators } from "redux";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/continuelist";
import "codemirror/mode/gfm/gfm";
import "codemirror/keymap/vim";
import "codemirror/theme/dracula.css";
import EditorBottomBar from "../molecules/EditorBottomBar";

const cmOptions: CodeMirror.EditorConfiguration = {
  lineNumbers: true,
  mode: "markdown",
  theme: "dracula",
  lineWrapping: true,
  keyMap: "vim",
  extraKeys: {
    Enter: "newlineAndIndentContinueMarkdownList"
  }
};

const TextareaContainer = styled.div`
  padding: 20px;
  background-color: ${dracula.background};
  height: calc(100vh - 70px);
  .CodeMirror {
    z-index: 0;
    height: 100%;
    bottom: 0;
    font-family: Inconsolata;
    font-size: 14px;
  }
`;

interface Props {
  file: MarkdownFile;
  updateFile: (id: string, content: string) => Action;
}

const Editor: React.FC<Props> = ({ file, updateFile }) => {
  const cm = useRef<CodeMirror.EditorFromTextArea>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const disabledHandleChange = useRef<boolean>(false);

  const [keyBuffer, setKeyBuffer] = useState("");

  useLayoutEffect(
    () => {
      if (textarea && textarea.current) {
        // React.RefObject is broken...
        (cm.current as CodeMirror.EditorFromTextArea) = CodeMirror.fromTextArea(
          textarea.current,
          cmOptions
        );

        disabledHandleChange.current = false;

        cm.current!.getDoc().setValue(file.content);
        cm.current!.on("change", onChange);
        // Type difinition for vim mode is broken.
        cm.current!.on("vim-keypress", onVimKeypress as any);
        cm.current!.on("vim-command-done", onVimCommandDone);

        setKeyBuffer("");
      }

      return () => {
        if (cm && cm.current) {
          cm.current!.off("change", onChange);
          cm.current!.off("vim-keypress", onVimKeypress as any);
          cm.current!.off("vim-command-done", onVimCommandDone);
          cm.current!.toTextArea();
        }
      };
    },
    [file.id]
  );

  useEffect(() => {
    if (textarea && textarea.current) {
      const doc = cm.current!.getDoc();
      const isValueChanged = file.content !== doc.getValue();

      if (isValueChanged && !disabledHandleChange.current) {
        doc.setValue(file.content);
      }
    }
  });

  function onChange(cm: CodeMirror.Editor) {
    const value = cm.getDoc().getValue();
    disabledHandleChange.current = true;

    updateFile(file.id, value);

    disabledHandleChange.current = false;
  }

  function onVimKeypress(key: string) {
    setKeyBuffer(key);
  }

  function onVimCommandDone() {
    setKeyBuffer("");
  }

  return (
    <TextareaContainer>
      <textarea ref={textarea} />
      <EditorBottomBar keyBuffer={keyBuffer} fileContent={file.content} />
    </TextareaContainer>
  );
};

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    ...bindActionCreators({ updateFile: actionCreators.updateFile }, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Editor);
