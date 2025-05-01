import { put, takeEvery } from "redux-saga/effects"
import { CREATE_CONTACTUS, CREATE_CONTACTUS_RED, DELETE_CONTACTUS, DELETE_CONTACTUS_RED, GET_CONTACTUS, GET_CONTACTUS_RED, UPDATE_CONTACTUS, UPDATE_CONTACTUS_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {              //Worker Saga
    let response = yield createRecord("contactus", action.payload)
    yield put({ type: CREATE_CONTACTUS_RED, payload: response })

    // let response = yield createMultipartRecord("contactus", action.payload)
    // yield put({ type: CREATE_CONTACTUS_RED, payload: response })
}

function* getSaga() {                       //Worker Saga
    let response = yield getRecord("contactus")
    yield put({ type: GET_CONTACTUS_RED, payload: response })
}

function* updateSaga(action) {              //Worker Saga
    yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTACTUS_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("contactus", action.payload)
    // yield put({ type: UPDATE_CONTACTUS_RED, payload: response })
}

function* deleteSaga(action) {              //Worker Saga
    yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACTUS_RED, payload: action.payload })
}

export default function* contactusSagas() {
    yield takeEvery(CREATE_CONTACTUS, createSaga)    //Watcher Saga
    yield takeEvery(GET_CONTACTUS, getSaga)          //Watcher Saga
    yield takeEvery(UPDATE_CONTACTUS, updateSaga)    //Watcher Saga
    yield takeEvery(DELETE_CONTACTUS, deleteSaga)    //Watcher Saga
}

