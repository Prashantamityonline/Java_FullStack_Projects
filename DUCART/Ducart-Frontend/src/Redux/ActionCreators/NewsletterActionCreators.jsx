import { CREATE_NEWSLETTER, DELETE_NEWSLETTER, GET_NEWSLETTER, UPDATE_NEWSLETTER } from "../Constants"

export function createNewsletter(data) {
    return {
        type: CREATE_NEWSLETTER,
        payload: data
    }
}

export function getNewsletter() {
    return {
        type: GET_NEWSLETTER
    }
}

export function updateNewsletter(data) {
    return {
        type: UPDATE_NEWSLETTER,
        payload: data
    }
}

export function deleteNewsletter(data) {
    return {
        type: DELETE_NEWSLETTER,
        payload: data
    }
}