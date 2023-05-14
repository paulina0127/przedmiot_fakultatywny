import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { doctorListReducer } from './reducers/doctorReducer';
import {
  userProfileDetailsReducer,
  userCreateProfileReducer,
  userUpdateProfileReducer,
  userLinkProfileReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  auth: authReducer,

  userProfileDetails: userProfileDetailsReducer,
  userCreateProfile: userCreateProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userLinkProfile: userLinkProfileReducer,

  doctorList: doctorListReducer,
});

const userTokensFromStorage = localStorage.getItem('userTokens')
  ? JSON.parse(localStorage.getItem('userTokens'))
  : null;

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const initialState = {
  auth: {
    userTokens: userTokensFromStorage,
    user: userFromStorage,
  },
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
