import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_RESET,
  APPOINTMENT_LIST_SUCCESS,
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
