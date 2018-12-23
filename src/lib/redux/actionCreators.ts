import { action } from "typesafe-actions";
import { MarkdownFile, Workspace } from "../types";

export enum ActionTypes {
  INIT = "INIT",
  SET_INITIALIZATION = "SET_INITIALIZATION",
  ADD_FILE = "ADD_FILE",
  SET_NEW_FILE = "SET_NEW_FILE",
  DELTE_FILE = "DELETE_FILE",
  SET_DELETED_FILES = "SET_DELETED_FILES",
  UPDATE_FILE = "UPDATE_FILE",
  SET_UPDATED_FILE = "SET_UPDATED_FILE",
  SWITCH_CURRENT_FILE = "SWITCH_CURRENT_FILE",
  SET_CURRENT_FILE = "SET_CURRENT_FILE",
  ADD_WORKSPACE = "ADD_WORKSPACE",
  SET_NEW_WORKSPACE = "SET_NEW_WORKSPACE",
  UPDATE_WORKSPACE = "UPDATE_WORKSPACE",
  SET_UPDATED_WORKSPACE = "SET_UPDATED_WORKSPACE",
  DELETE_WORKSPACE = "DELETE_WORKSPACE",
  SET_DELETED_WORKSPACES = "SET_DELETED_WORKSPACES",
  SWITCH_WORKSPACE = "SWITCH_WORKSPACE",
  SET_SWITCHED_WORKSPACE = "SET_SWITCHED_WORKSPACE"
}

export interface Action {
  type: ActionTypes;
  payload: any;
}

const init = () => action(ActionTypes.INIT);

const setInitialization = (
  files: MarkdownFile[],
  workspaces: Workspace[],
  currentFileId: string
) =>
  action(ActionTypes.SET_INITIALIZATION, { files, workspaces, currentFileId });

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

const setSwitchedWorkspace = (files: MarkdownFile[]) =>
  action(ActionTypes.SET_SWITCHED_WORKSPACE, { files });

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
  setSwitchedWorkspace
};
