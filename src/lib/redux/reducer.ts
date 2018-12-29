import { ActionTypes, Action } from "./actionCreators";
import { MarkdownFile, Workspace } from "../types";

export interface State {
  files: MarkdownFile[];
  currentFileId: string;
  workspaces: Workspace[];
  currentWorkspaceId: string;
}

const initialState: State = {
  files: [],
  currentFileId: "",
  workspaces: [],
  currentWorkspaceId: ""
};

export default function reducer(state: State = initialState, action: Action): State {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_INITIALIZATION:
      return {
        ...state,
        files: payload.files,
        currentFileId: payload.currentFileId,
        workspaces: payload.workspaces,
        currentWorkspaceId: payload.currentWorkspaceId
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
    case ActionTypes.SET_NEW_WORKSPACE:
      return {
        ...state,
        workspaces: [...state.workspaces, payload.workspace]
      };
    case ActionTypes.SET_UPDATED_WORKSPACE:
      const { workspaces } = state;
      const newWorkspaces = workspaces.map(workspace => {
        if (workspace.id === payload.workspace.id) return payload.workspace;
        return workspace;
      });
      return {
        ...state,
        workspaces: newWorkspaces
      };
    case ActionTypes.SET_DELETED_WORKSPACES:
      return {
        ...state,
        workspaces: payload.workspaces
      };
    case ActionTypes.SET_SWITCHED_WORKSPACE:
      return {
        ...state,
        currentWorkspaceId: payload.workspaceId,
        files: payload.files
      };
    default:
      return {
        ...state
      };
  }
}
