import axios from "axios";

import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
} from "../constants/appointmentConsts";

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem("userTokens"));
  const token = userTokens ? userTokens.access : null;
  return {
    "Content-Type": "application/json",
    Authorization: `JWT ${token}`,
  };
};

export const listAppointments = (filters) => async (dispatch) => {
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
    dispatch({ type: APPOINTMENT_LIST_REQUEST });

    const { data } = await axios.get(`/appointments${query}`, config);

    dispatch({
      type: APPOINTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const getAppointment = (id) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };

  try {
    dispatch({ type: APPOINTMENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/appointments/${id}`, config);

    dispatch({
      type: APPOINTMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createAppointment = (values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };

  const body = JSON.stringify({
    date: values.date,
    time: values.time,
    symptoms: values.symptoms.filter((symptom) => symptom !== ""),
    medicine: values.medicine.filter((med) => med !== ""),
    doctor: values.doctor,
    patient: values.patient,
  });

  try {
    dispatch({
      type: APPOINTMENT_CREATE_REQUEST,
    });

    const { data } = await axios.post(`/appointments`, body, config);

    dispatch({
      type: APPOINTMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateAppointment = (id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };

  const body =
    typeof values === "object"
      ? JSON.stringify({
          status: values.status,
        })
      : JSON.stringify({
          recommendations: values,
        });

  try {
    dispatch({
      type: APPOINTMENT_UPDATE_REQUEST,
    });

    const { data } = await axios.patch(`/appointments/${id}`, body, config);

    dispatch({
      type: APPOINTMENT_UPDATE_SUCCESS,
      payload: data?.message,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: APPOINTMENT_UPDATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};
