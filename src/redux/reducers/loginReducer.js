import {
  LOGIN,
  FORGOT_PASSWORD,
  LOGIN_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_FAILURE,
} from '../../constants';

const USER_STATE = {
  loading: false,
  forgotDone: false,
};

export default (state = USER_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false };
    case LOGIN_FAILURE:
      return { ...state, loading: false };
    case FORGOT_PASSWORD:
      return { ...state, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case FORGOT_PASSWORD_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
