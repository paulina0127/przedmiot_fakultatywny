import {
  SLOT_LIST_FAIL,
  SLOT_LIST_REQUEST,
  SLOT_LIST_RESET,
  SLOT_LIST_SUCCESS,
} from "../constants/statsAndSlotsConsts";

export const slotsListReducer = (state = { slots: [] }, action) => {
  switch (action.type) {
    case SLOT_LIST_REQUEST:
      return { loadingSlots: true, slots: [] };

    case SLOT_LIST_SUCCESS:
      return {
        loadingSlots: false,
        slots: action.payload,
      };
    case SLOT_LIST_FAIL:
      return { loadingSlots: false, errorSlots: action.payload };

    case SLOT_LIST_RESET:
      return { slots: [] };

    default:
      return state;
  }
};
