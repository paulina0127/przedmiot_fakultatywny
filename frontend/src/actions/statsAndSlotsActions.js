import axios from "axios";

import {
  SLOT_LIST_FAIL,
  SLOT_LIST_REQUEST,
  SLOT_LIST_SUCCESS,
} from "../constants/statsAndSlotsConsts";

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
