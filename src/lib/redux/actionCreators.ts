import { action } from "typesafe-actions";
import { MarkdownFile, Workspace } from "../types";
import * as ActionTypes from "./actionCreators/types";

export interface Action {
  type: string;
  payload: any;
}

const init = () => action(ActionTypes.INIT);

const setInitialization = (
  files: MarkdownFile[],
  workspaces: Workspace[],
  currentFileId: string | null,
  currentWorkspaceId: string
) =>
  action(ActionTypes.SET_INITIALIZATION, {
    files,
    workspaces,
    currentFileId,
    currentWorkspaceId
  });

const addFile = (file: MarkdownFile) => action(ActionTypes.ADD_FILE, { file });

const setNewFile = (file: MarkdownFile) =>
  action(ActionTypes.SET_NEW_FILE, { file });

const deleteFile = (file: MarkdownFile) =>
  action(ActionTypes.DELTE_FILE, { file });

const setDeletedFiles = (files: MarkdownFile[]) =>
  action(ActionTypes.SET_DELETED_FILES, { files });

const updateFile = (id: string, content: string) =>
  action(ActionTypes.UPDATE_FILE, { id, content });

const setUpdatedFile = (file: MarkdownFile) =>
  action(ActionTypes.SET_UPDATED_FILE, { file });

const switchCurrentFile = (file: MarkdownFile) =>
  action(ActionTypes.SWITCH_CURRENT_FILE, { file });

const setCurrentFile = (file: MarkdownFile) =>
  action(ActionTypes.SET_CURRENT_FILE, { file });

const addWorkspace = (workspace: Workspace) =>
  action(ActionTypes.ADD_WORKSPACE, { workspace });

const setNewWorkspaces = (workspace: Workspace) =>
  action(ActionTypes.SET_NEW_WORKSPACE, { workspace });

const updateWorkspace = (id: string, name: string, color: string) =>
  action(ActionTypes.UPDATE_WORKSPACE, { id, name, color });

const setUpdatedWorkspace = (workspace: Workspace) =>
  action(ActionTypes.SET_UPDATED_WORKSPACE, { workspace });

const deleteWorkspace = (id: string) =>
  action(ActionTypes.DELETE_WORKSPACE, { id });

const setDeletedWorkspace = (workspaces: Workspace[]) =>
  action(ActionTypes.SET_DELETED_WORKSPACES, { workspaces });

const switchWorkspace = (workspaceId: string) =>
  action(ActionTypes.SWITCH_WORKSPACE, { workspaceId });

const setSwitchedWorkspace = (workspaceId: string, files: MarkdownFile[]) =>
  action(ActionTypes.SET_SWITCHED_WORKSPACE, { workspaceId, files });

const switchEditorMode = () => action(ActionTypes.SWITCH_EDITOR_MODE);

export default {
  init,
  setInitialization,
  addFile,
  setNewFile,
  deleteFile,
  setDeletedFiles,
  updateFile,
  setUpdatedFile,
  switchCurrentFile,
  setCurrentFile,
  addWorkspace,
  setNewWorkspaces,
  updateWorkspace,
  setUpdatedWorkspace,
  deleteWorkspace,
  setDeletedWorkspace,
  switchWorkspace,
  setSwitchedWorkspace,
  switchEditorMode
};
