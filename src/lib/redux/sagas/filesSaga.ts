import { SagaIterator } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import { DBServiceInterface } from "../../services/DBService";
import actionCreators, { ActionTypes } from "../actionCreators";
import { MarkdownFile } from "../../types";
import { findNoteTitle } from "../../utils";
import { State } from "../reducer";
import bindDependencies from "../../utils/bindDependencies";
import Types from "../../services/Types";
import _ from "lodash";

function* addFileSaga(db: DBServiceInterface): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.ADD_FILE);
    const { file } = payload;
    const currentWorkspaceId = yield select((state: State) => state.currentWorkspaceId);
    yield call(db.addFile, file, currentWorkspaceId);
    yield put({ type: ActionTypes.SET_NEW_FILE, payload: { file } });
  }
}

function* deleteFileSaga(db: DBServiceInterface): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.DELTE_FILE);
    const { file } = payload;
    yield call(db.deleteFile, file.id);
    const currentWorkspaceId: string = yield select((state: State) => state.currentWorkspaceId);
    const newFiles: MarkdownFile[] = yield call(db.getFilesByWorkspaceId, currentWorkspaceId);
    yield put(actionCreators.setDeletedFiles(newFiles));
  }
}

function* updateFileSaga(db: DBServiceInterface): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.UPDATE_FILE);
    const { id, content } = payload;
    const file = {
      id,
      content,
      title: findNoteTitle(content)
    };
    const currentWorkspaceId = yield select((state: State) => state.currentWorkspaceId);
    yield call(_.debounce(db.updateFile, 100), file, currentWorkspaceId);
    yield put(actionCreators.setUpdatedFile(file));
  }
}

export default function*(): SagaIterator {
  yield fork(bindDependencies(addFileSaga, [Types.DBService]));
  yield fork(bindDependencies(deleteFileSaga, [Types.DBService]));
  yield fork(bindDependencies(updateFileSaga, [Types.DBService]));
}
