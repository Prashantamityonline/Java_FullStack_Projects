import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_BRAND,
  CREATE_BRAND_RED,
  DELETE_BRAND,
  DELETE_BRAND_RED,
  GET_BRAND,
  GET_BRAND_RED,
  UPDATE_BRAND,
  UPDATE_BRAND_RED,
} from "../Constants";

import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Services";

function* createSaga(action) {
  try {
    let response = yield createMultipartRecord("brand", action.payload);
    yield put({ type: CREATE_BRAND_RED, payload: response });
  } catch (error) {
    console.error("Error creating brand:", error);
  }
}
function* getSaga() {
  let response = yield getRecord("brand");
  yield put({ type: GET_BRAND_RED, payload: response });
}
function* updateSaga(action) {
  const formData = action.payload;
  try {
    const id = formData.get("id"); // id yaha se milega ab
    yield updateMultipartRecord("brand", formData, id);
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload });
  } catch (error) {
    console.error("Error creating brand:", error);
  }
}

function* deleteSaga(action) {
  yield deleteRecord("brand", action.payload);
  yield put({ type: DELETE_BRAND_RED, payload: action.payload });
}

export default function* brandSaga() {
  yield takeEvery(CREATE_BRAND, createSaga);
  yield takeEvery(GET_BRAND, getSaga);
  yield takeEvery(UPDATE_BRAND, updateSaga);
  yield takeEvery(DELETE_BRAND, deleteSaga);
}
