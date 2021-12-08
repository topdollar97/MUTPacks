const INITIAL_STATE = {
    pulls: {},
}

const localPackReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'CHECK_PULLS':
            return {...state}
        case 'ADD_PULL':{
            let num = action.payload
            let value = 1
            if (state.pulls[num]){
                value = state.pulls[num] +1;
            }
            return { ...state, pulls:{ ...state.pulls, [num]: value} };
        }
        case 'REMOVE_PULL':
            const num = action.payload
            let value = state.pulls[num] -1
            // console.log()

            if(value <=0){
                let newPulls = {...state.pulls}
                delete newPulls[num]
                return {...state, pulls:{...newPulls}}
            } else{
                return{ ...state, pulls:{ ...state.pulls, [num]: value} }
            }
            
        case 'CLEAR_PULLS':
            return {...state, pulls:{} };
        default:
            return state;
    }
};

export default localPackReducer;
