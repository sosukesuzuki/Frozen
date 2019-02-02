import { action } from "typesafe-actions";
import { MarkdownFile, Workspace } from "../types";
import * as ActionTypes from "./actionCreators/types";

export interface Action {
  type: string;
  payload: any;
}

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
