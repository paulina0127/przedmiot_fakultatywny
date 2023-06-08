import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_RESET,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_RESET,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_RESET,
  APPOINTMENT_UPDATE_SUCCESS,
} from "../constants/appointmentConsts";

export const appointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loadingAppointments: true, appointments: [] };

    case APPOINTMENT_LIST_SUCCESS:
      return {
        loadingAppointments: false,
        appointments: action.payload.results,
        countAppointments: action.payload.count,
      };

    case APPOINTMENT_LIST_FAIL:
      return {
        loadingAppointments: false,
        errorAppointments: action.payload,
      };

    case APPOINTMENT_LIST_RESET:
      return { appointments: [] };

    default:
      return state;
  }
};

export const appointmentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return { ...state, loadingAppointment: true };

    case APPOINTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loadingAppointment: false,
        appointment: action.payload,
      };

    case APPOINTMENT_DETAILS_FAIL:
    case APPOINTMENT_DETAILS_RESET:
      return { ...state, errorAppointment: action.payload };

    case APPOINTMENT_DETAILS_RESET:
      return { ...state, appointment: {} };

    default:
      return state;
  }
};

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return { loadingAppointmentCreate: true };

    case APPOINTMENT_CREATE_SUCCESS:
      return {
        loadingAppointmentCreate: false,
        successAppointmentCreate: true,
      };

    case APPOINTMENT_CREATE_FAIL:
      return {
        loadingAppointmentCreate: false,
        errorAppointmentCreate: action.payload,
      };

    case APPOINTMENT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const appointmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return { loadingAppointmentUpdate: true };

    case APPOINTMENT_UPDATE_SUCCESS:
      return {
        loadingAppointmentUpdate: false,
        successAppointmentUpdate: true,
        successAppointmentUpdateMessage: action.payload,
      };

    case APPOINTMENT_UPDATE_FAIL:
      return {
        loadingAppointmentUpdate: false,
        errorAppointmentUpdate: action.payload,
      };

    case APPOINTMENT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
