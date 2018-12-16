import { SagaIterator } from "redux-saga";
import { fork, take, call, put } from "redux-saga/effects";
import actionCreators, { ActionTypes } from "./actionCreators";
import bindDependencies from "../utils/bindDependencies";
import Types from "../services/Types";
import { DBServiceInterface } from "../services/DBService";
import { LocalStorageServiceInterface } from "../services/LocalStorageService";
import { MarkdownFile } from "../types";
import _ from "lodash";
import { findNoteTitle } from "../utils";

function* initSaga(
  db: DBServiceInterface,
  localStorage: LocalStorageServiceInterface
): SagaIterator {
  yield take(ActionTypes.INIT);
  const files: MarkdownFile[] = yield call(db.getFiles, null);
  const currentFileId: string = yield call(localStorage.getCurrentFile);
  yield put({
    type: ActionTypes.SET_INITIALIZATION,
    payload: { files, currentFileId }
  });
}

function* addFileSaga(db: DBServiceInterface): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.ADD_FILE);
    const { file } = payload;
    yield call(db.addFile, file);
    yield put({ type: ActionTypes.SET_NEW_FILE, payload: { file } });
  }
}

function* deleteFileSaga(db: DBServiceInterface): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.DELTE_FILE);
    const { file } = payload;
    yield call(db.deleteFile, file.id);
    const newFiles: MarkdownFile[] = yield call(db.getFiles);
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
    yield call(_.debounce(db.updateFile, 100), file);
    yield put(actionCreators.setUpdatedFile(file));
  }
}

function* switchCurrentFileSaga(
  localStorage: LocalStorageServiceInterface
): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.SWITCH_CURRENT_FILE);
    const { file } = payload;
    yield call(localStorage.setCurrentFile, file);
    yield put({ type: ActionTypes.SET_CURRENT_FILE, payload: { file } });
  }
}

export default function* saga(): SagaIterator {
  yield fork(
    bindDependencies(initSaga, [Types.DBService, Types.LocalStorageService])
  );
  yield fork(bindDependencies(addFileSaga, [Types.DBService]));
  yield fork(bindDependencies(deleteFileSaga, [Types.DBService]));
  yield fork(bindDependencies(updateFileSaga, [Types.DBService]));
  yield fork(
    bindDependencies(switchCurrentFileSaga, [Types.LocalStorageService])
  );
}
