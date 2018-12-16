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

export default {
  init(): Action {
    return {
      type: ActionTypes.INIT,
      payload: null
    };
  },
  setInitialization(files: MarkdownFile[], currentFile?: MarkdownFile): Action {
    return {
      type: ActionTypes.SET_INITIALIZATION,
      payload: {
        files,
        currentFile
      }
    };
  },
  addFile(file: MarkdownFile): Action {
    return {
      type: ActionTypes.ADD_FILE,
      payload: {
        file
      }
    };
  },
  setNewFile(file: MarkdownFile): Action {
    return {
      type: ActionTypes.SET_NEW_FILE,
      payload: {
        file
      }
    };
  },
  deleteFile(file: MarkdownFile): Action {
    return {
      type: ActionTypes.DELTE_FILE,
      payload: {
        file
      }
    };
  },
  setDeletedFiles(files: MarkdownFile[]): Action {
    return {
      type: ActionTypes.SET_DELETED_FILES,
      payload: {
        files
      }
    };
  },
  updateFile(id: string, content: string) {
    return {
      type: ActionTypes.UPDATE_FILE,
      payload: {
        id,
        content
      }
    };
  },
  setUpdatedFile(file: MarkdownFile): Action {
    return {
      type: ActionTypes.SET_UPDATED_FILE,
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
