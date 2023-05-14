import axios from 'axios';
import {
  USER_DETAILS_PROFILE_REQUEST,
  USER_DETAILS_PROFILE_SUCCESS,
  USER_DETAILS_PROFILE_FAIL,
  USER_CREATE_PROFILE_REQUEST,
  USER_CREATE_PROFILE_SUCCESS,
  USER_CREATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LINK_PROFILE_FAIL,
  USER_LINK_PROFILE_RESET,
  USER_LINK_PROFILE_SUCCESS,
  USER_LINK_PROFILE_REQUEST,
} from '../constants/userConst';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

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
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${token}`,
      },
    };

    const body = {
      first_name: values.first_name,
      last_name: values.last_name,
      pesel: values.pesel,
      birthdate: values.birthdate,
      email: values.email,
      phone_number: values.phone_number,
      street: values.street,
      postal_code: values.postal_code,
      city: values.city,
      image: values.image,
    };

    values?.medicine
      ?.filter((med) => med !== '')
      .forEach((med, index) => {
        body[`medicine[${index}]`] = med;
      });

    values?.allergies
      ?.filter((allergy) => allergy !== '')
      .forEach((allergy, index) => {
        body[`allergies[${index}]`] = allergy;
      });

    values?.diseases
      ?.filter((disease) => disease !== '')
      .forEach((disease, index) => {
        body[`diseases[${index}]`] = disease;
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

export const linkUserProfile = (id, values) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    user_id: id,
    pesel: values.pesel,
    link_key: values.link_key,
  });

  try {
    dispatch({
      type: USER_LINK_PROFILE_REQUEST,
    });

    const { data } = await axios.put(`/patients/link`, body, config);

    dispatch({
      type: USER_LINK_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: USER_LINK_PROFILE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateUserProfile = (id, values) => async (dispatch) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${token}`,
      },
    };

    const body = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
      street: values.street,
      postal_code: values.postal_code,
      city: values.city,
      image: values.image,
    };

    values?.medicine
      ?.filter((med) => med !== '')
      .forEach((med, index) => {
        body[`medicine[${index}]`] = med;
      });

    values?.allergies
      ?.filter((allergy) => allergy !== '')
      .forEach((allergy, index) => {
        body[`allergies[${index}]`] = allergy;
      });

    values?.diseases
      ?.filter((disease) => disease !== '')
      .forEach((disease, index) => {
        body[`diseases[${index}]`] = disease;
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
