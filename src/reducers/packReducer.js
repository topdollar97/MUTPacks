import _ from 'lodash';
// const INITIAL_STATE = {
//     pulls: {},
// }


const packReducer = (state ={}, action) =>{
    switch(action.type){
        case "FETCH_PACKS":
            return { ...state, ..._.mapKeys(action.payload, '_id')}
        case "FETCH_PACK":
            return{ ...state, [action.payload._id]: action.payload }
        case "CREATE_PACK":
            return { ...state, [action.payload._id]: action.payload }
        case "EDIT_PACK":
            return { ...state, [action.payload._id]: action.payload }
        case "DELETE_PACK":
            return _.omit(state, action.payload)
        case "TRY_USER":
            return{ ...state, userPulls: action.payload.userPulls }
        case "PERSONAL_PULLS":
            return{ ...state, [action.payload._id]: action.payload }
        default:
            return state;
    }
}

export default packReducer;