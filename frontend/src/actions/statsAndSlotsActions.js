import axios from "axios";

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
  SLOT_LIST_SUCCESS,
} from "../constants/statsAndSlotsConsts";

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem("userTokens"));
  const token = userTokens ? userTokens.access : null;
  return {
    "Content-Type": "application/json",
    Authorization: `JWT ${token}`,
  };
};

export const listSlots = (filters) => async (dispatch) => {
  let query = "?";

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== "") {
          query += `${key}=${val}&`;
        }
      });
    } else if (value !== "") {
      query += `${key}=${value}&`;
    }
  });

  // Remove the trailing '&' character from the query string
  query = query.slice(0, -1);

  try {
    dispatch({ type: SLOT_LIST_REQUEST });

    const { data } = await axios.get(`/slots${query}`);

    dispatch({
      type: SLOT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: SLOT_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const listPatientStats = (filters) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  let query = "?";

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== "") {
          query += `${key}=${val}&`;
        }
      });
    } else if (value !== "") {
      query += `${key}=${value}&`;
    }
  });

  // Remove the trailing '&' character from the query string
  query = query.slice(0, -1);

  try {
    dispatch({ type: PATIENT_STATS_REQUEST });

    const { data } = await axios.get(`/patient_stats${query}`, config);

    dispatch({
      type: PATIENT_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PATIENT_STATS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const listAppointmentStats = (filters) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  let query = "?";

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== "") {
          query += `${key}=${val}&`;
        }
      });
    } else if (value !== "") {
      query += `${key}=${value}&`;
    }
  });

  // Remove the trailing '&' character from the query string
  query = query.slice(0, -1);

  try {
    dispatch({ type: APPOINTMENT_STATS_REQUEST });

    const { data } = await axios.get(`/appointment_stats${query}`, config);

    dispatch({
      type: APPOINTMENT_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: APPOINTMENT_STATS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};
