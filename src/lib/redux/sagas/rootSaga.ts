import { SagaIterator } from "redux-saga";
import { fork, take, call, all, put } from "redux-saga/effects";
import { DBServiceInterface } from "../../services/DBService";
import { LocalStorageServiceInterface } from "../../services/LocalStorageService";
import { setInitialization } from "../actionCreators/Root";
import * as ActionTypes from "../actionCreators/types";
import { MarkdownFile, Workspace } from "../../types";
import { generateWorkspace } from "../../utils/ItemGenerator";
import bindDependencies from "../../utils/bindDependencies";
import Types from "../../services/Types";
import filesSaga from "./filesSaga";
import currentFileSaga from "./currentFileSaga";
import workspacesSaga from "./workspacesSaga";
import currentWorkspaceSaga from "./currentWorkspaceSaga";

function* initSaga(
  db: DBServiceInterface,
  localStorage: LocalStorageServiceInterface
): SagaIterator {
  yield take(ActionTypes.INIT);
  const currentFileId: string | null = yield call(localStorage.getCurrentFile);

  const workspaces: Workspace[] = yield call(db.getWorkspaces);

  let currentWorkspaceId: string | null;

  currentWorkspaceId = yield call(localStorage.getCurrentWorkspace);

  if (workspaces.length === 0) {
    const newWorkspace = generateWorkspace("Default Workspace");
    yield call(db.addWorkspace, newWorkspace);
    const files: MarkdownFile[] = yield call(db.getFiles);
    // migrate
    yield all(files.map(file => call(db.updateFile, file, newWorkspace.id)));
    workspaces.push(newWorkspace);
    currentWorkspaceId = newWorkspace.id;
  }

  const isIncludeId = workspaces.some(
    workspace => workspace.id === currentWorkspaceId
  );

  if (currentWorkspaceId == null || !isIncludeId) currentWorkspaceId = "";

  const files: MarkdownFile[] = yield call(
    db.getFilesByWorkspaceId,
    currentWorkspaceId
  );

  yield put(
    setInitialization(files, workspaces, currentFileId, currentWorkspaceId)
  );
}

export default function*() {
  yield fork(
    bindDependencies(initSaga, [Types.DBService, Types.LocalStorageService])
  );
  yield fork(filesSaga);
  yield fork(currentFileSaga);
  yield fork(workspacesSaga);
  yield fork(currentWorkspaceSaga);
}
