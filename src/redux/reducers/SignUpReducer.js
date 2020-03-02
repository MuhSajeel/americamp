import { SIGNUP, FETCH_USER_PROFILE, SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../../constants';

const USER_STATE = {
  loading: false,
};

export default (state = USER_STATE, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, loading: true };
    case FETCH_USER_PROFILE:
      return { ...state, loading: false };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false };
    case SIGNUP_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
