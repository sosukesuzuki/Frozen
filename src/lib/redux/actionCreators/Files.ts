import { action } from "typesafe-actions";
import { MarkdownFile } from "@lib/types";
import * as ActionTypes from "./types";

export const addFile = (file: MarkdownFile) =>
  action(ActionTypes.ADD_FILE, { file });

export const setNewFile = (file: MarkdownFile) =>
  action(ActionTypes.SET_NEW_FILE, { file });

export const deleteFile = (file: MarkdownFile) =>
  action(ActionTypes.DELTE_FILE, { file });

export const setDeletedFiles = (files: MarkdownFile[]) =>
  action(ActionTypes.SET_DELETED_FILES, { files });

export const updateFile = (id: string, content: string) =>
  action(ActionTypes.UPDATE_FILE, { id, content });

export const setUpdatedFile = (file: MarkdownFile) =>
  action(ActionTypes.SET_UPDATED_FILE, { file });
