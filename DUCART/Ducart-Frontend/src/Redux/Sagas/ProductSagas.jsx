import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_RED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_RED,
  GET_PRODUCT,
  GET_PRODUCT_RED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_RED,
} from "../Constants";

import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services";

function* createSaga(action) {
  let response = yield createMultipartRecord("product", action.payload);
  yield put({ type: CREATE_PRODUCT_RED, payload: response });
}
function* getSaga() {
  let response = yield getRecord("product");
  yield put({ type: GET_PRODUCT_RED, payload: response });
}
function* updateSaga(action) {
  yield updateRecord("product", action.payload);
  yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord("product", action.payload);
  yield put({ type: DELETE_PRODUCT_RED, payload: action.payload });
}

export default function* productSaga() {
  yield takeEvery(CREATE_PRODUCT, createSaga);
  yield takeEvery(GET_PRODUCT, getSaga);
  yield takeEvery(UPDATE_PRODUCT, updateSaga);
  yield takeEvery(DELETE_PRODUCT, deleteSaga);
}
