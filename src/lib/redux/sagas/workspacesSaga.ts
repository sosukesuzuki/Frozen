import { SagaIterator } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import { DBServiceInterface } from "../../services/DBService";
import {
  setNewWorkspaces,
  setUpdatedWorkspace,
  setDeletedWorkspace
} from "../actionCreators/Workspace";
import * as ActionTypes from "../actionCreators/types";
import { Workspace } from "../../types";
import { State } from "../reducer";
import bindDependencies from "../../utils/bindDependencies";
import Types from "../../services/Types";
import _ from "lodash";

function* addWorkspaceSaga(db: DBServiceInterface): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.ADD_WORKSPACE);
    const { workspace }: { workspace: Workspace } = payload;
    yield call(db.addWorkspace, workspace);
    yield put(setNewWorkspaces(workspace));
  }
}

function* updateWorkspaceSaga(db: DBServiceInterface): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.UPDATE_WORKSPACE);
    const { id, name, color } = payload;
    const workspace = {
      id,
      name,
      color
    };
    yield call(db.updateWorkspace, workspace);
    yield put(setUpdatedWorkspace(workspace));
  }
}

function* deleteWorkspaceSaga(db: DBServiceInterface): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.DELETE_WORKSPACE);
    const { id } = payload;
    const oldWorkspaces = yield select((state: State) => state.workspaces);
    if (oldWorkspaces.length !== 1) {
      yield call(db.deleteWorkspace, id);
      const workspaces: Workspace[] = yield call(db.getWorkspaces);
      yield put(setDeletedWorkspace(workspaces));
    } else {
      console.info("Workspaces should be least one.");
    }
  }
}

export default function*() {
  yield fork(bindDependencies(addWorkspaceSaga, [Types.DBService]));
  yield fork(bindDependencies(updateWorkspaceSaga, [Types.DBService]));
  yield fork(bindDependencies(deleteWorkspaceSaga, [Types.DBService]));
}
