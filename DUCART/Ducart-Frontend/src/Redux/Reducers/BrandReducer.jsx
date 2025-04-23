import { CREATE_BRAND_RED, DELETE_BRAND_RED, GET_BRAND_RED, UPDATE_BRAND_RED } from "../Constants"
export default function BrandReducer(state=[],action){
    switch(action.type){
        case CREATE_BRAND_RED:
            let newState =  [...state]
            newState.push(action.payload)
            return newState

        case GET_BRAND_RED:
            return action.payload

        case UPDATE_BRAND_RED:
            let index = state.findIndex((x)=>x.id===action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state

        case DELETE_BRAND_RED:
            return state.filter((x)=>x.id!==action.payload.id)

        default:
            return state
    }
}