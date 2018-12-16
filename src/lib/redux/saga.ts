import { SagaIterator } from "redux-saga";
import { fork, take, call, put } from "redux-saga/effects";
import { ActionTypes } from "./actionCreators";
import bindDependencies from "../utils/bindDependencies";
import Types from "../services/Types";
import { DBServiceInterface } from "../services/DBService";
import { LocalStorageServiceInterface } from "../services/LocalStorageService";

function* addFileSaga(db: DBServiceInterface): SagaIterator {
  const { payload } = yield take(ActionTypes.ADD_NOTE);
  const { file } = payload;
  yield call(db.addFile, file);
  yield put({ type: ActionTypes.SET_NEW_NOTE, payload: { file } });
}

function* updateFileSaga(db: DBServiceInterface): SagaIterator {
  const { payload } = yield take(ActionTypes.UPDATE_NOTE);
  const { file } = payload;
  yield call(db.updateFile, file);
  yield put({ type: ActionTypes.SET_UPDATED_NOTE, payload: { file } });
}

function* switchCurrentFileSaga(
  localStorage: LocalStorageServiceInterface
): SagaIterator {
  const { payload } = yield take(ActionTypes.SWITCH_CURRENT_FILE);
  const { file } = payload;
  yield call(localStorage.setCurrentFile, file);
  yield put({ type: ActionTypes.SET_CURRENT_FILE, payload: { file } });
}

export default function* saga(): SagaIterator {
  yield fork(bindDependencies(addFileSaga, [Types.DBService]));
  yield fork(bindDependencies(updateFileSaga, [Types.DBService]));
  yield fork(
    bindDependencies(switchCurrentFileSaga, [Types.LocalStorageService])
  );
}
