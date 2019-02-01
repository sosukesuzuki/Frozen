import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import reducer from "./reducer";
import rootSaga from "./sagas/rootSaga";

const env = process.env.NODE_ENV;

const sagaMiddleware = createSagaMiddleWare();

const store =
  env === "production"
    ? createStore(reducer, applyMiddleware(sagaMiddleware))
    : createStore(
        reducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
      );

sagaMiddleware.run(rootSaga);

export default store;
