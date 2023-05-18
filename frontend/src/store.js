import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import {
  doctorDetailsReducer,
  doctorListReducer,
} from "./reducers/doctorReducer";
import {
  patientCreateReducer,
  patientDetailsReducer,
  patientLinkReducer,
  patientListReducer,
  patientUpdateReducer,
} from "./reducers/patientReducer";
import { slotsListReducer } from "./reducers/statsAndSlotsReducer";

const reducer = combineReducers({
  auth: authReducer,

  doctorList: doctorListReducer,
  doctorDetails: doctorDetailsReducer,

  patientList: patientListReducer,
  patientDetails: patientDetailsReducer,
  patientCreate: patientCreateReducer,
  patientUpdate: patientUpdateReducer,
  patientLink: patientLinkReducer,

  slotsList: slotsListReducer,
});

const userTokensFromStorage = localStorage.getItem("userTokens")
  ? JSON.parse(localStorage.getItem("userTokens"))
  : null;

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
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
