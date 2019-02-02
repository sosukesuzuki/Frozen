import { action } from "typesafe-actions";
import { Workspace } from "@lib/types";
import * as ActionTypes from "./types";

export const addWorkspace = (workspace: Workspace) =>
  action(ActionTypes.ADD_WORKSPACE, { workspace });

export const setNewWorkspaces = (workspace: Workspace) =>
  action(ActionTypes.SET_NEW_WORKSPACE, { workspace });

export const updateWorkspace = (id: string, name: string, color: string) =>
  action(ActionTypes.UPDATE_WORKSPACE, { id, name, color });

export const setUpdatedWorkspace = (workspace: Workspace) =>
  action(ActionTypes.SET_UPDATED_WORKSPACE, { workspace });

export const deleteWorkspace = (id: string) =>
  action(ActionTypes.DELETE_WORKSPACE, { id });

export const setDeletedWorkspace = (workspaces: Workspace[]) =>
  action(ActionTypes.SET_DELETED_WORKSPACES, { workspaces });
