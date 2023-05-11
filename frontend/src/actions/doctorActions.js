import axios from 'axios';
import {
  DOCTOR_LIST_FAIL,
  DOCTOR_DETAILS_CLEAR,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_CLEAR,
  DOCTOR_LIST_SUCCESS,
} from '../constants/doctorConsts';

export const listDoctors = () => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_LIST_REQUEST });

    const { data } = await axios.get('/doctors');

    dispatch({
      type: DOCTOR_LIST_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: DOCTOR_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};
