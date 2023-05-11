import axios from 'axios';
import {
  USER_DETAILS_PROFILE_REQUEST,
  USER_DETAILS_PROFILE_SUCCESS,
  USER_DETAILS_PROFILE_FAIL,
  USER_CREATE_PROFILE_REQUEST,
  USER_CREATE_PROFILE_SUCCESS,
  USER_CREATE_PROFILE_FAIL,
  USER_CREATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_DELETE_PROFILE_REQUEST,
  USER_DELETE_PROFILE_SUCCESS,
  USER_DELETE_PROFILE_FAIL,
} from '../constants/userConst';

export const getUserDetails = (id) => async (dispatch) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    try {
      dispatch({ type: USER_DETAILS_PROFILE_REQUEST });

      const { data } = await axios.get(`/patients/${id}`, config);

      dispatch({
        type: USER_DETAILS_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorKey = Object.keys(error?.response?.data || {})[0];
      dispatch({
        type: USER_DETAILS_PROFILE_FAIL,
        payload: errorKey ? error.response.data[errorKey] : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_DETAILS_PROFILE_FAIL,
    });
  }
};

export const createUserProfile = (values) => async (dispatch) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };

    const body = JSON.stringify({
      first_name: values.first_name,
      last_name: values.last_name,
      pesel: values.pesel,
      birthdate: values.birthdate,
      email: values.email,
      phone_number: values.phone_number,
      street: values.street,
      postal_code: values.postal_code,
      city: values.city,
      medicine: values.medicine.filter((med) => med !== ''),
      allergies: values.allergies.filter((allergy) => allergy !== ''),
      diseases: values.diseases.filter((disease) => disease !== ''),
      image: values.image,
    });

    try {
      dispatch({
        type: USER_CREATE_PROFILE_REQUEST,
      });

      const { data } = await axios.post(`/patients`, body, config);

      dispatch({
        type: USER_CREATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorKey = Object.keys(error?.response?.data || {})[0];
      dispatch({
        type: USER_CREATE_PROFILE_FAIL,
        payload: errorKey ? error.response.data[errorKey] : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_CREATE_PROFILE_FAIL,
    });
  }
};

export const updateUserProfile = (id, values) => async (dispatch) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };

    const body = JSON.stringify({
      first_name: values.first_name,
      last_name: values.last_name,
      pesel: values.pesel,
      birthdate: values.birthdate,
      email: values.email,
      phone_number: values.phone_number,
      street: values.street,
      postal_code: values.postal_code,
      city: values.city,
      medicine: values.medicine.filter((med) => med !== ''),
      allergies: values.allergies.filter((allergy) => allergy !== ''),
      diseases: values.diseases.filter((disease) => disease !== ''),
      image: values.image,
    });

    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const { data } = await axios.patch(`/patients/${id}`, body, config);

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorKey = Object.keys(error?.response?.data || {})[0];
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: errorKey ? error.response.data[errorKey] : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
    });
  }
};
