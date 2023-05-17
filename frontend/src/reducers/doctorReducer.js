import {
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_RESET,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_RESET,
  DOCTOR_LIST_SUCCESS,
} from "../constants/doctorConsts";

export const doctorListReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return { loading: true, doctors: [] };

    case DOCTOR_LIST_SUCCESS:
      return {
        loading: false,
        doctors: action.payload.results,
        count: action.payload.count,
      };
    case DOCTOR_LIST_FAIL:
      return { loading: false, error: action.payload.results };

    case DOCTOR_LIST_RESET:
      return { doctors: [] };

    default:
      return state;
  }
};

export const doctorDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_DETAILS_REQUEST:
      return { ...state, loading: true };

    case DOCTOR_DETAILS_SUCCESS:
      return { ...state, loading: false, doctor: action.payload };

    case DOCTOR_DETAILS_FAIL:
      return { ...state, error: action.payload };

    case DOCTOR_DETAILS_RESET:
      return { ...state, doctor: {} };

    default:
      return state;
  }
};
