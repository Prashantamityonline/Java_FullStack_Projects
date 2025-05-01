import { CREATE_CONTACTUS, DELETE_CONTACTUS, GET_CONTACTUS, UPDATE_CONTACTUS } from "../Constants"

export function createContactUs(data) {
    return {
        type: CREATE_CONTACTUS,
        payload: data
    }
}

export function getContactUs() {
    return {
        type: GET_CONTACTUS
    }
}

export function updateContactUs(data) {
    return {
        type: UPDATE_CONTACTUS,
        payload: data
    }
}

export function deleteContactUs(data) {
    return {
        type: DELETE_CONTACTUS,
        payload: data
    }
}