import { CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_RED } from "../Constants"
export default function SubcategoryReducer(state=[],action){
    switch(action.type){
        case CREATE_SUBCATEGORY_RED:
            let newState =  [...state]
            newState.push(action.payload)
            return newState

        case GET_SUBCATEGORY_RED:
            return action.payload

        case UPDATE_SUBCATEGORY_RED:
            let index = state.findIndex((x)=>x.id===action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state

        case DELETE_SUBCATEGORY_RED:
            return state.filter((x)=>x.id!==action.payload.id)

        default:
            return state
    }
}