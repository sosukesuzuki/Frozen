import { action } from "typesafe-actions";
import * as ActionTypes from "./types";

export const switchEditorMode = () => action(ActionTypes.SWITCH_EDITOR_MODE);
