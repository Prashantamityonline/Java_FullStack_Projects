import { CREATE_CONTACTUS_RED, DELETE_CONTACTUS_RED, GET_CONTACTUS_RED, UPDATE_CONTACTUS_RED } from "../Constants"
export default function ContactUsReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CONTACTUS_RED:
            return [...state, action.payload]

        case GET_CONTACTUS_RED:
            return action.payload

        case UPDATE_CONTACTUS_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].active = action.payload.active
            return state

        case DELETE_CONTACTUS_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}