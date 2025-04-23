import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import RootReducer from "./Reducers/RootReducer";
import RootSaga from "./Sagas/RootSaga"

const saga = createSagaMiddleware()

const Store  = configureStore({
    reducer:RootReducer,
    middleware : ()=>[saga]
})

export default Store

saga.run(RootSaga)