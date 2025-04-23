import { CREATE_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST_RED } from "../Constants"
export default function WishlistReducer(state=[],action){
    switch(action.type){
        case CREATE_WISHLIST_RED:
            let newState =  [...state]
            newState.push(action.payload)
            return newState

        case GET_WISHLIST_RED:
            return action.payload

        case DELETE_WISHLIST_RED:
            return state.filter((x)=>x.id!==action.payload.id)

        default:
            return state
    }
}