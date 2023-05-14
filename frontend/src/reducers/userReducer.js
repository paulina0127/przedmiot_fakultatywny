import {
  USER_DETAILS_PROFILE_REQUEST,
  USER_DETAILS_PROFILE_SUCCESS,
  USER_DETAILS_PROFILE_FAIL,
  USER_DETAILS_PROFILE_RESET,
  USER_CREATE_PROFILE_REQUEST,
  USER_CREATE_PROFILE_SUCCESS,
  USER_CREATE_PROFILE_FAIL,
  USER_CREATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  // USER_DELETE_PROFILE_REQUEST,
  // USER_DELETE_PROFILE_SUCCESS,
  // USER_DELETE_PROFILE_FAIL,
  USER_LINK_PROFILE_FAIL,
  USER_LINK_PROFILE_SUCCESS,
  USER_LINK_PROFILE_RESET,
  USER_LINK_PROFILE_REQUEST,
} from '../constants/userConst';

export const userProfileDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_DETAILS_PROFILE_FAIL:
    case USER_DETAILS_PROFILE_RESET:
      return { ...state, user: {} };
    default:
      return state;
  }
};

export const userCreateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_PROFILE_REQUEST:
      return { loadingCreate: true };
    case USER_CREATE_PROFILE_SUCCESS:
      return { loadingCreate: false, successCreate: true };
    case USER_CREATE_PROFILE_FAIL:
      return { loadingCreate: false, errorCreate: action.payload };
    case USER_CREATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userLinkProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LINK_PROFILE_REQUEST:
      return { loadingLink: true };
    case USER_LINK_PROFILE_SUCCESS:
      return { loadingLink: false, successLink: true };
    case USER_LINK_PROFILE_FAIL:
      return { loadingLink: false, errorLink: action.payload };
    case USER_LINK_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
