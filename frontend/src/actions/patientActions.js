import axios from "axios";

import {
  PATIENT_CREATE_FAIL,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_RESET,
  PATIENT_CREATE_SUCCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_LINK_FAIL,
  PATIENT_LINK_REQUEST,
  PATIENT_LINK_RESET,
  PATIENT_LINK_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_RESET,
  PATIENT_UPDATE_SUCCESS,
} from "../constants/patientConsts";

const getAuthHeaders = (content_type) => {
  const userTokens = JSON.parse(localStorage.getItem("userTokens"));
  const token = userTokens ? userTokens.access : null;
  return {
    "Content-Type": `${content_type}`,
    Authorization: `JWT ${token}`,
  };
};

const defaultConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const listPatients = (filters) => async (dispatch) => {
  const config = { headers: getAuthHeaders("application/json") };

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

export const getPatient = (id) => async (dispatch) => {
  const config = { headers: getAuthHeaders("application/json") };

  try {
    dispatch({ type: PATIENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/patients/${id}`, config);

    dispatch({
      type: PATIENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createPatient = (values) => async (dispatch) => {
  const config = { headers: getAuthHeaders("multipart/form-data") };

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
    ?.filter((med) => med !== "")
    .forEach((med, index) => {
      body[`medicine[${index}]`] = med;
    });

  values?.allergies
    ?.filter((allergy) => allergy !== "")
    .forEach((allergy, index) => {
      body[`allergies[${index}]`] = allergy;
    });

  values?.diseases
    ?.filter((disease) => disease !== "")
    .forEach((disease, index) => {
      body[`diseases[${index}]`] = disease;
    });

  try {
    dispatch({
      type: PATIENT_CREATE_REQUEST,
    });

    const { data } = await axios.post(`/patients`, body, config);

    dispatch({
      type: PATIENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PATIENT_CREATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updatePatient = (id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders("multipart/form-data") };

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
    ?.filter((med) => med !== "")
    .forEach((med, index) => {
      body[`medicine[${index}]`] = med;
    });

  values?.allergies
    ?.filter((allergy) => allergy !== "")
    .forEach((allergy, index) => {
      body[`allergies[${index}]`] = allergy;
    });

  values?.diseases
    ?.filter((disease) => disease !== "")
    .forEach((disease, index) => {
      body[`diseases[${index}]`] = disease;
    });

  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
    });

    const { data } = await axios.patch(`/patients/${id}`, body, config);

    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const linkPatient = (id, values) => async (dispatch) => {
  const body = JSON.stringify({
    user_id: id,
    pesel: values.pesel,
    link_key: values.link_key,
  });

  try {
    dispatch({
      type: PATIENT_LINK_REQUEST,
    });

    const { data } = await axios.put(`/patients/link`, body, defaultConfig);

    dispatch({
      type: PATIENT_LINK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: PATIENT_LINK_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};
