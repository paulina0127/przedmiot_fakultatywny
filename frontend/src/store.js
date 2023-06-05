import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import {
  appointmentCreateReducer,
  appointmentDetailsReducer,
  appointmentListReducer,
  appointmentUpdateReducer,
} from "./reducers/appointmentReducer";
import { authReducer } from "./reducers/authReducer";
import {
  doctorDetailsReducer,
  doctorListReducer,
  specializationListReducer,
} from "./reducers/doctorReducer";
import {
  patientCreateReducer,
  patientDetailsReducer,
  patientLinkReducer,
  patientListReducer,
  patientUpdateReducer,
} from "./reducers/patientReducer";
import {
  prescriptionCreateReducer,
  prescriptionDetailsReducer,
  prescriptionListReducer,
  prescriptionUpdateReducer,
} from "./reducers/prescriptionReducer";
import {
  appointmentStatsReducer,
  patientStatsReducer,
  slotsListReducer,
} from "./reducers/statsAndSlotsReducer";

const reducer = combineReducers({
  auth: authReducer,

  doctorList: doctorListReducer,
  doctorDetails: doctorDetailsReducer,
  specializationList: specializationListReducer,

  patientList: patientListReducer,
  patientDetails: patientDetailsReducer,
  patientCreate: patientCreateReducer,
  patientUpdate: patientUpdateReducer,
  patientLink: patientLinkReducer,

  slotsList: slotsListReducer,
  patientStats: patientStatsReducer,
  appointmentStats: appointmentStatsReducer,

  appointmentList: appointmentListReducer,
  appointmentDetails: appointmentDetailsReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentUpdate: appointmentUpdateReducer,

  prescriptionList: prescriptionListReducer,
  prescriptionDetails: prescriptionDetailsReducer,
  prescriptionCreate: prescriptionCreateReducer,
  prescriptionUpdate: prescriptionUpdateReducer,
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
