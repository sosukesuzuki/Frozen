import { SagaIterator } from "redux-saga";
import { fork, take, call, put } from "redux-saga/effects";
import { LocalStorageServiceInterface } from "../../services/LocalStorageService";
import * as ActionTypes from "../actionCreators/types";
import bindDependencies from "../../utils/bindDependencies";
import Types from "../../services/Types";

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

export default function*(): SagaIterator {
  yield fork(
    bindDependencies(switchCurrentFileSaga, [Types.LocalStorageService])
  );
}
