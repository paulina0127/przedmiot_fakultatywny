import axios from "axios";

import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_DETAILS_FAIL,
  PRESCRIPTION_DETAILS_REQUEST,
  PRESCRIPTION_DETAILS_SUCCESS,
  PRESCRIPTION_LIST_FAIL,
  PRESCRIPTION_LIST_REQUEST,
  PRESCRIPTION_LIST_SUCCESS,
  PRESCRIPTION_UPDATE_FAIL,
  PRESCRIPTION_UPDATE_REQUEST,
  PRESCRIPTION_UPDATE_SUCCESS,
} from "../constants/prescriptionConsts";

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem("userTokens"));
  const token = userTokens ? userTokens.access : null;
  return {
    "Content-Type": "application/json",
    Authorization: `JWT ${token}`,
  };
};

export const listPrescriptions = (id) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };

  try {
    dispatch({ type: PRESCRIPTION_LIST_REQUEST });

    const { data } = await axios.get(
      `/appointments/${id}/prescriptions`,
      config
    );

    dispatch({
      type: PRESCRIPTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PRESCRIPTION_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const getPrescription = (id) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };

  try {
    dispatch({ type: PRESCRIPTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/prescriptionss/${id}`, config);

    dispatch({
      type: PRESCRIPTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PRESCRIPTION_DETAILS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createPrescription = (id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };

  const body = JSON.stringify({
    medicine: values.medicine.filter((med) => med !== ""),
  });

  try {
    dispatch({
      type: PRESCRIPTION_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      `/appointments/${id}/prescriptions`,
      body,
      config
    );

    dispatch({
      type: PRESCRIPTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PRESCRIPTION_CREATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updatePrescription = (id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };

  const body = JSON.stringify({
    status: values.status,
  });

  try {
    dispatch({
      type: PRESCRIPTION_UPDATE_REQUEST,
    });

    const { data } = await axios.patch(`/prescriptions/${id}`, body, config);

    dispatch({
      type: PRESCRIPTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PRESCRIPTION_UPDATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};
