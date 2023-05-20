import axios from "axios";

import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_CREATE_SUCCESS,
} from "../constants/appointmentConsts";

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem("userTokens"));
  const token = userTokens ? userTokens.access : null;
  return {
    "Content-Type": "application/json",
    Authorization: `JWT ${token}`,
  };
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
    console.log(error.response.data);
    const errorKey = Object.keys(error?.response?.data || {})[0];

    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};
