import { ActionTypes, Action } from "./actionCreators";
import { MarkdownFile } from "../types";

interface State {
  files: MarkdownFile[];
  currentFile?: MarkdownFile;
}

const initialState: State = {
  files: [],
  currentFile: undefined
};

export default function reducer(state: State = initialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_NEW_NOTE:
      return {
        ...state,
        files: [...state.files, payload.file]
      };
    case ActionTypes.SET_UPDATED_NOTE:
      const { files } = state;
      const newFiles = files.map(file => {
        if (file.id === payload.file.id) return payload.file;
        return file;
      });
      return {
        ...state,
        files: newFiles
      };
    case ActionTypes.SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: payload.file
      };
    default:
      return {
        ...state
      };
  }
}
