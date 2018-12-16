import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import logger from "redux-logger";
import reducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

export default store;
