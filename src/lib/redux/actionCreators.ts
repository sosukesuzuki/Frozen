import { action } from "typesafe-actions";
import { MarkdownFile } from "../types";

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
  SET_CURRENT_FILE = "SET_CURRENT_FILE"
}

export interface Action {
  type: ActionTypes;
  payload: any;
}

const init = () => action(ActionTypes.INIT);

const setInitialization = (files: MarkdownFile[], currentFile?: MarkdownFile) =>
  action(ActionTypes.SET_INITIALIZATION, { files, currentFile });

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
  setCurrentFile
};
