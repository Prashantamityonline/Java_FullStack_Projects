import { put, takeEvery } from "redux-saga/effects"
import { CREATE_NEWSLETTER, CREATE_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED, UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {              //Worker Saga
    let response = yield createRecord("newsletter", action.payload)
    yield put({ type: CREATE_NEWSLETTER_RED, payload: response })

    // let response = yield createMultipartRecord("newsletter", action.payload)
    // yield put({ type: CREATE_NEWSLETTER_RED, payload: response })
}

function* getSaga() {                       //Worker Saga
    let response = yield getRecord("newsletter")
    yield put({ type: GET_NEWSLETTER_RED, payload: response })
}

function* updateSaga(action) {              //Worker Saga
    yield updateRecord("newsletter", action.payload)
    yield put({ type: UPDATE_NEWSLETTER_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("newsletter", action.payload)
    // yield put({ type: UPDATE_NEWSLETTER_RED, payload: response })
}

function* deleteSaga(action) {              //Worker Saga
    yield deleteRecord("newsletter", action.payload)
    yield put({ type: DELETE_NEWSLETTER_RED, payload: action.payload })
}

export default function* newsletterSagas() {
    yield takeEvery(CREATE_NEWSLETTER, createSaga)    //Watcher Saga
    yield takeEvery(GET_NEWSLETTER, getSaga)          //Watcher Saga
    yield takeEvery(UPDATE_NEWSLETTER, updateSaga)    //Watcher Saga
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)    //Watcher Saga
}

