import axios from 'axios';
import {
  DOCTOR_LIST_FAIL,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
} from '../constants/doctorConsts';

export const listDoctors = (filters) => async (dispatch) => {
  let query = '';

  Object.entries(filters).forEach(([key, value]) => {
    query = '?';
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== '') {
          query += `${key}=${val}&`;
        }
      });
    } else if (value !== '') {
      query += `${key}=${value}&`;
    }
  });

  // Remove the trailing '&' character from the query string
  query = query.slice(0, -1);

  try {
    dispatch({ type: DOCTOR_LIST_REQUEST });

    const { data } = await axios.get(`/doctors${query}`);

    dispatch({
      type: DOCTOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: DOCTOR_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const listDoctor = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/doctors/${id}`);

    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};
