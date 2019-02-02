import { SagaIterator } from "redux-saga";
import { fork, take, call, put } from "redux-saga/effects";
import { DBServiceInterface } from "../../services/DBService";
import { LocalStorageServiceInterface } from "../../services/LocalStorageService";
import actionCreators from "../actionCreators";
import * as ActionTypes from "../actionCreators/types";
import { MarkdownFile } from "../../types";
import bindDependencies from "../../utils/bindDependencies";
import Types from "../../services/Types";
import _ from "lodash";

function* switchCurrentWorkspaceSaga(
  db: DBServiceInterface,
  localStorage: LocalStorageServiceInterface
): SagaIterator {
  while (true) {
    const { payload } = yield take(ActionTypes.SWITCH_WORKSPACE);
    const { workspaceId } = payload;
    const files: MarkdownFile[] = yield call(
      db.getFilesByWorkspaceId,
      workspaceId
    );
    yield call(localStorage.setCurrentWorkspace, workspaceId);
    yield put(actionCreators.setSwitchedWorkspace(workspaceId, files));
  }
}

export default function*(): SagaIterator {
  yield fork(
    bindDependencies(switchCurrentWorkspaceSaga, [
      Types.DBService,
      Types.LocalStorageService
    ])
  );
}
