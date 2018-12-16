import { MarkdownFile } from "../types";

export enum ActionTypes {
  ADD_NOTE = "ADD_NOTE",
  SET_NEW_NOTE = "SET_NEW_NOTE",
  UPDATE_NOTE = "UPDATE_NOTE",
  SET_UPDATED_NOTE = "SET_UPDATED_NOTE",
  SWITCH_CURRENT_FILE = "SWITCH_CURRENT_FILE",
  SET_CURRENT_FILE = "SET_CURRENT_FILE"
}

export interface Action {
  type: ActionTypes;
  payload: any;
}

export default {
  addNote(file: MarkdownFile): Action {
    return {
      type: ActionTypes.ADD_NOTE,
      payload: {
        file
      }
    };
  },
  setNewNote(file: MarkdownFile): Action {
    return {
      type: ActionTypes.SET_NEW_NOTE,
      payload: {
        file
      }
    };
  },
  updateNote(id: string, content: string) {
    return {
      type: ActionTypes.UPDATE_NOTE,
      payload: {
        id,
        content
      }
    };
  },
  setUpdatedNote(file: MarkdownFile): Action {
    return {
      type: ActionTypes.SET_UPDATED_NOTE,
      payload: {
        file
      }
    };
  },
  switchCurrentFile(file: MarkdownFile): Action {
    return {
      type: ActionTypes.SWITCH_CURRENT_FILE,
      payload: {
        file
      }
    };
  },
  setCurrentFile(file: MarkdownFile): Action {
    return {
      type: ActionTypes.SET_CURRENT_FILE,
      payload: {
        file
      }
    };
  }
};
