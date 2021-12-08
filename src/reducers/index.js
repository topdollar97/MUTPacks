import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from "./authReducer";
import packReducer from "./packReducer";
import localPackReducer from './localPackReducers';

export default combineReducers({
   form: formReducer,
   auth: authReducer,
   packs: packReducer,
   local: localPackReducer
});