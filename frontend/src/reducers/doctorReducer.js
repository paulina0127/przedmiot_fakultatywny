import {
  DOCTOR_LIST_FAIL,
  DOCTOR_DETAILS_RESET,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_RESET,
  DOCTOR_LIST_SUCCESS,
} from '../constants/doctorConsts';

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
      return { loading: false, error: action.payload };
    case DOCTOR_LIST_RESET:
      return { doctors: [] };
    default:
      return state;
  }
};
