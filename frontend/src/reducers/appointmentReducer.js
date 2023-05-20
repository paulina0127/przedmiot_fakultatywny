import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_CREATE_SUCCESS,
} from "../constants/appointmentConsts";

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
