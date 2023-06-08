import {
  APPOINTMENT_STATS_FAIL,
  APPOINTMENT_STATS_REQUEST,
  APPOINTMENT_STATS_RESET,
  APPOINTMENT_STATS_SUCCESS,
  PATIENT_STATS_FAIL,
  PATIENT_STATS_REQUEST,
  PATIENT_STATS_RESET,
  PATIENT_STATS_SUCCESS,
  SLOT_LIST_FAIL,
  SLOT_LIST_REQUEST,
  SLOT_LIST_RESET,
  SLOT_LIST_SUCCESS,
} from "../constants/statsAndSlotsConsts";

export const slotsListReducer = (state = { slots: [] }, action) => {
  switch (action.type) {
    case SLOT_LIST_REQUEST:
      return { loadingSlots: true, slots: [] };

    case SLOT_LIST_SUCCESS:
      return {
        loadingSlots: false,
        slots: action.payload,
      };
    case SLOT_LIST_FAIL:
      return { loadingSlots: false, errorSlots: action.payload };

    case SLOT_LIST_RESET:
      return { slots: [] };

    default:
      return state;
  }
};

export const patientStatsReducer = (state = { patientStats: [] }, action) => {
  switch (action.type) {
    case PATIENT_STATS_REQUEST:
      return { loadingPatientStats: true, patientStats: [] };

    case PATIENT_STATS_SUCCESS:
      return {
        loadingPatientStats: false,
        patientStats: action.payload,
      };

    case PATIENT_STATS_FAIL:
      return { loadingPatientStats: false, errorPatientStats: action.payload };

    case PATIENT_STATS_RESET:
      return { patientStats: [] };

    default:
      return state;
  }
};

export const appointmentStatsReducer = (
  state = { appointmentStats: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_STATS_REQUEST:
      return { loadingAppointmentStats: true, appointmentStats: [] };

    case APPOINTMENT_STATS_SUCCESS:
      return {
        loadingAppointmentStats: false,
        appointmentStats: action.payload,
      };
    case APPOINTMENT_STATS_FAIL:
      return {
        loadingAppointmentStats: false,
        errorAppointmentStats: action.payload,
      };

    case APPOINTMENT_STATS_RESET:
      return { appointmentStats: [] };

    default:
      return state;
  }
};
