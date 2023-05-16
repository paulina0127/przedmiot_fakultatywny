import axios from 'axios';
import {
  PATIENT_LIST_FAIL,
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
} from '../constants/patientConsts';

const getAuthHeaders = (content_type) => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'));
  const token = userTokens ? userTokens.access : null;
  return {
    'Content-Type': `${content_type}`,
    Authorization: `JWT ${token}`,
  };
};

export const listPatients = (filters) => async (dispatch) => {
  const config = { headers: getAuthHeaders('application/json') };

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
    dispatch({ type: PATIENT_LIST_REQUEST });

    const { data } = await axios.get(`/patients${query}`, config);

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PATIENT_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const listPatient = (id) => async (dispatch) => {
  const config = { headers: getAuthHeaders('application/json') };

  try {
    dispatch({ type: PATIENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/patients/${id}`, config);

    dispatch({
      type: PATIENT_DETAILS_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};
