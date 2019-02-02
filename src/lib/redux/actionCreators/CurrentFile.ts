import { action } from "typesafe-actions";
import { MarkdownFile } from "@lib/types";
import * as ActionTypes from "./types";

export const switchCurrentFile = (file: MarkdownFile) =>
  action(ActionTypes.SWITCH_CURRENT_FILE, { file });

export const setCurrentFile = (file: MarkdownFile) =>
  action(ActionTypes.SET_CURRENT_FILE, { file });
