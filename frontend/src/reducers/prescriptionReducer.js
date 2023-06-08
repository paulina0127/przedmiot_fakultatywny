import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_RESET,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_DETAILS_FAIL,
  PRESCRIPTION_DETAILS_REQUEST,
  PRESCRIPTION_DETAILS_RESET,
  PRESCRIPTION_DETAILS_SUCCESS,
  PRESCRIPTION_LIST_FAIL,
  PRESCRIPTION_LIST_REQUEST,
  PRESCRIPTION_LIST_RESET,
  PRESCRIPTION_LIST_SUCCESS,
  PRESCRIPTION_UPDATE_FAIL,
  PRESCRIPTION_UPDATE_REQUEST,
  PRESCRIPTION_UPDATE_RESET,
  PRESCRIPTION_UPDATE_SUCCESS,
} from "../constants/prescriptionConsts";

export const prescriptionListReducer = (
  state = { prescriptions: [] },
  action
) => {
  switch (action.type) {
    case PRESCRIPTION_LIST_REQUEST:
      return { loadingPrescriptions: true, prescriptions: [] };

    case PRESCRIPTION_LIST_SUCCESS:
      return {
        loadingPrescriptions: false,
        prescriptions: action.payload.results,
        countPrescriptions: action.payload.count,
      };

    case PRESCRIPTION_LIST_FAIL:
      return {
        loadingPrescriptions: false,
        errorPrescriptions: action.payload,
      };

    case PRESCRIPTION_LIST_RESET:
      return { prescriptions: [] };

    default:
      return state;
  }
};

export const prescriptionDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_DETAILS_REQUEST:
      return { ...state, loadingPrescription: true };

    case PRESCRIPTION_DETAILS_SUCCESS:
      return {
        ...state,
        loadingPrescription: false,
        prescription: action.payload,
      };

    case PRESCRIPTION_DETAILS_FAIL:
    case PRESCRIPTION_DETAILS_RESET:
      return { ...state, errorPrescription: action.payload };

    case PRESCRIPTION_DETAILS_RESET:
      return { ...state, prescription: {} };

    default:
      return state;
  }
};

export const prescriptionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_CREATE_REQUEST:
      return { loadingPrescriptionCreate: true };

    case PRESCRIPTION_CREATE_SUCCESS:
      return {
        loadingPrescriptionCreate: false,
        successPrescriptionCreate: true,
      };

    case PRESCRIPTION_CREATE_FAIL:
      return {
        loadingPrescriptionCreate: false,
        errorPrescriptionCreate: action.payload,
      };

    case PRESCRIPTION_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const prescriptionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_UPDATE_REQUEST:
      return { loadingPrescriptionUpdate: true };

    case PRESCRIPTION_UPDATE_SUCCESS:
      return {
        loadingPrescriptionUpdate: false,
        successPrescriptionUpdate: true,
      };

    case PRESCRIPTION_UPDATE_FAIL:
      return {
        loadingPrescriptionUpdate: false,
        errorPrescriptionUpdate: action.payload,
      };

    case PRESCRIPTION_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
