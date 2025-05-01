import { put, takeEvery } from "redux-saga/effects"
import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/index"

function* createSaga(action) {              //Worker Saga
    let response = yield createRecord("product", action.payload)
    yield put({ type: CREATE_PRODUCT_RED, payload: response })

    // let response = yield createMultipartRecord("product", action.payload)
    // yield put({ type: CREATE_PRODUCT_RED, payload: response })
}

function* getSaga() {                       //Worker Saga
    let response = yield getRecord("product")
    yield put({ type: GET_PRODUCT_RED, payload: response })
}

function* updateSaga(action) {              //Worker Saga
    yield updateRecord("product", action.payload)
    yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("product", action.payload)
    // yield put({ type: UPDATE_PRODUCT_RED, payload: response })
}

function* deleteSaga(action) {              //Worker Saga
    yield deleteRecord("product", action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}

export default function* productSagas() {
    yield takeEvery(CREATE_PRODUCT, createSaga)    //Watcher Saga
    yield takeEvery(GET_PRODUCT, getSaga)          //Watcher Saga
    yield takeEvery(UPDATE_PRODUCT, updateSaga)    //Watcher Saga
    yield takeEvery(DELETE_PRODUCT, deleteSaga)    //Watcher Saga
}

