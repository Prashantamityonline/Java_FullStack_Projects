import { put, takeEvery } from "redux-saga/effects"
import { CREATE_USER, CREATE_USER_RED, DELETE_USER, DELETE_USER_RED, GET_USER, GET_USER_RED, UPDATE_USER, UPDATE_USER_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {              //Worker Saga
    let response = yield createRecord("user", action.payload)
    yield put({ type: CREATE_USER_RED, payload: response })

    // let response = yield createMultipartRecord("user", action.payload)
    // yield put({ type: CREATE_USER_RED, payload: response })
}

function* getSaga() {                       //Worker Saga
    let response = yield getRecord("user")
    yield put({ type: GET_USER_RED, payload: response })
}

function* updateSaga(action) {              //Worker Saga
    yield updateRecord("user", action.payload)
    yield put({ type: UPDATE_USER_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("user", action.payload)
    // yield put({ type: UPDATE_USER_RED, payload: response })
}

function* deleteSaga(action) {              //Worker Saga
    yield deleteRecord("user", action.payload)
    yield put({ type: DELETE_USER_RED, payload: action.payload })
}

export default function* userSagas() {
    yield takeEvery(CREATE_USER, createSaga)    //Watcher Saga
    yield takeEvery(GET_USER, getSaga)          //Watcher Saga
    yield takeEvery(UPDATE_USER, updateSaga)    //Watcher Saga
    yield takeEvery(DELETE_USER, deleteSaga)    //Watcher Saga
}

