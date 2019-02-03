import { action } from "typesafe-actions";
import { MarkdownFile } from "@lib/types";
import * as ActionTypes from "./types";

export const switchWorkspace = (workspaceId: string) =>
  action(ActionTypes.SWITCH_WORKSPACE, { workspaceId });

export const setSwitchedWorkspace = (
  workspaceId: string,
  files: MarkdownFile[]
) => action(ActionTypes.SET_SWITCHED_WORKSPACE, { workspaceId, files });
