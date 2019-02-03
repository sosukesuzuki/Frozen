import { action } from "typesafe-actions";
import { MarkdownFile, Workspace } from "@lib/types";
import * as ActionTypes from "./types";

export const init = () => action(ActionTypes.INIT);

export const setInitialization = (
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
