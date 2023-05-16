import {
  PATIENT_CREATE_FAIL,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_RESET,
  PATIENT_CREATE_SUCCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_RESET,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_LINK_FAIL,
  PATIENT_LINK_REQUEST,
  PATIENT_LINK_RESET,
  PATIENT_LINK_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_RESET,
  PATIENT_LIST_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_RESET,
  PATIENT_UPDATE_SUCCESS,
} from "../constants/patientConsts";

export const patientListReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { loading: true, patients: [] };

    case PATIENT_LIST_SUCCESS:
      return {
        loading: false,
        patients: action.payload.results,
        count: action.payload.count,
      };

    case PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload.results };
    case PATIENT_LIST_RESET:
      return { patients: [] };

    default:
      return state;
  }
};

export const patientDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PATIENT_DETAILS_SUCCESS:
      return { ...state, loading: false, patient: action.payload };

    case PATIENT_DETAILS_FAIL:
    case PATIENT_DETAILS_RESET:
      return { ...state, error: action.payload };

    case PATIENT_DETAILS_RESET:
      return { ...state, patient: {} };

    default:
      return state;
  }
};

export const patientCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_REQUEST:
      return { loadingCreate: true };

    case PATIENT_CREATE_SUCCESS:
      return { loadingCreate: false, successCreate: true };

    case PATIENT_CREATE_FAIL:
      return { loadingCreate: false, errorCreate: action.payload };

    case PATIENT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const patientUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { loadingUpdate: true };

    case PATIENT_UPDATE_SUCCESS:
      return { loadingUpdate: false, successUpdate: true };

    case PATIENT_UPDATE_FAIL:
      return { loadingUpdate: false, errorUpdate: action.payload };

    case PATIENT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const patientLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_LINK_REQUEST:
      return { loadingLink: true };

    case PATIENT_LINK_SUCCESS:
      return { loadingLink: false, successLink: true };

    case PATIENT_LINK_FAIL:
      return { loadingLink: false, errorLink: action.payload };

    case PATIENT_LINK_RESET:
      return {};

    default:
      return state;
  }
};
