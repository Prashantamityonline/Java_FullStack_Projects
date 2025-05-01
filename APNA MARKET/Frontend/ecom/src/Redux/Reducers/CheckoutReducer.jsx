import { CREATE_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED } from "../Constants"
export default function CheckoutReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CHECKOUT_RED:
            return [...state, action.payload]

        case GET_CHECKOUT_RED:
            return action.payload

        case UPDATE_CHECKOUT_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].orderStatus = action.payload.orderStatus
            state[index].paymentStatus = action.payload.paymentStatus
            state[index].paymentMode = action.payload.paymentMode
            state[index].rppid = action.payload.rppid
            return state

        case DELETE_CHECKOUT_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}