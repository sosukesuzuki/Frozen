import { ActionTypes, Action } from "./actionCreators";
import { MarkdownFile } from "../types";

export interface State {
  files: MarkdownFile[];
  currentFileId: string;
}

const initialState: State = {
  files: [],
  currentFileId: ""
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_INITIALIZATION:
      return {
        ...state,
        files: payload.files,
        currentFileId: payload.currentFileId
      };
    case ActionTypes.SET_NEW_FILE:
      return {
        ...state,
        files: [...state.files, payload.file]
      };
    case ActionTypes.SET_DELETED_FILES:
      return {
        ...state,
        files: payload.files
      };
    case ActionTypes.SET_UPDATED_FILE:
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
        currentFileId: payload.file.id
      };
    default:
      return {
        ...state
      };
  }
}
