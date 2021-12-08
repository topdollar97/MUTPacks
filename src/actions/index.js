import axios from 'axios';

import { 
    SIGN_IN,
    SIGN_OUT,
} from './types';

export const signIn = (userId) =>{
    return{
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () =>{
    return {
        type: SIGN_OUT
    };
};

export const fetchLocalPulls =()=>{
    return{
        type: "CHECK_PULLS"
    }
}

export const addLocalPull =(newPull) =>{
    return{
        type: "ADD_PULL",
        payload: newPull
    }
}
export const removeLocalPull =(removePull) =>{
    return{
        type: "REMOVE_PULL",
        payload: removePull
    }
}

export const clearPulls = () =>{
    return{
        type:"CLEAR_PULLS"
    }
}

export const testSignIn = (author) => async (dispatch) =>{
    const response = await axios.post('https://mutpacks-api.herokuapp.com/newUser', { author, userPulls:{}});

    dispatch({ type: "TRY_USER", payload: response.data });
};


export const fetchPacks = () => async dispatch=>{
    const response = await axios.get('https://mutpacks-api.herokuapp.com/packs');
    dispatch({ type: "FETCH_PACKS", payload: response.data});
}

export const fetchPack = (id) => async dispatch=>{
    const response = await axios.get(`https://mutpacks-api.herokuapp.com/packs/${id}`);

    dispatch({ type: "FETCH_PACK", payload: response.data});
}

export const createPack = formValues => async (dispatch, getState) =>{
    const author = getState().auth.userId;
    const response = await axios.post('https://mutpacks-api.herokuapp.com/newPack', { ...formValues, author});

    dispatch({ type: "CREATE_PACK", payload: response.data });
};

export const recordPulls = (id, formValues) => async (dispatch, getState) =>{
    const author = getState().auth.userId;
    const response = await axios.post(`https://mutpacks-api.herokuapp.com/packs/${id}`, { ...formValues, author});

    dispatch({ type: "CREATE_PACK", payload: response.data });
};

export const recordPersonalPulls = (id, formValues, author,) => async (dispatch) =>{
    const response = await axios.post(`https://mutpacks-api.herokuapp.com/packs/${id}`, { ...formValues, author});

    dispatch({type: "PERSONAL_PULLS", payload: response.data});
}
