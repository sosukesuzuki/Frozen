import { action } from "typesafe-actions";
import { MarkdownFile } from "../types";
import * as ActionTypes from "./actionCreators/types";

export interface Action {
  type: string;
  payload: any;
}

const switchWorkspace = (workspaceId: string) =>
  action(ActionTypes.SWITCH_WORKSPACE, { workspaceId });

const setSwitchedWorkspace = (workspaceId: string, files: MarkdownFile[]) =>
  action(ActionTypes.SET_SWITCHED_WORKSPACE, { workspaceId, files });

const switchEditorMode = () => action(ActionTypes.SWITCH_EDITOR_MODE);

export default {
  switchWorkspace,
  setSwitchedWorkspace,
  switchEditorMode
};
