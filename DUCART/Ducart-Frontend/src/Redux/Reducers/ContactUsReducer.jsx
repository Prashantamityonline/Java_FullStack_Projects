import { CREATE_CONTACT_US_RED, DELETE_CONTACT_US_RED, GET_CONTACT_US_RED, UPDATE_CONTACT_US_RED } from "../Constants"
export default function ContactUsReducer(state=[],action){
    switch(action.type){
        case CREATE_CONTACT_US_RED:
            let newState =  [...state]
            newState.push(action.payload)
            return newState

        case GET_CONTACT_US_RED:
            return action.payload

        case UPDATE_CONTACT_US_RED:
            let index = state.findIndex((x)=>x.id===action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state

        case DELETE_CONTACT_US_RED:
            return state.filter((x)=>x.id!==action.payload.id)

        default:
            return state
    }
}