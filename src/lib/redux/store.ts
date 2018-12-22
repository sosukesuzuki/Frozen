import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import logger from "redux-logger";
import reducer from "./reducer";
import rootSaga from "./saga";

const env = process.env.NODE_ENV;

const sagaMiddleware = createSagaMiddleWare();

const store =
  env === "production"
    ? createStore(reducer, applyMiddleware(sagaMiddleware))
    : createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store;
