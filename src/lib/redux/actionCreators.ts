import { action } from "typesafe-actions";
import * as ActionTypes from "./actionCreators/types";

export interface Action {
  type: string;
  payload: any;
}

const switchEditorMode = () => action(ActionTypes.SWITCH_EDITOR_MODE);

export default {
  switchEditorMode
};
