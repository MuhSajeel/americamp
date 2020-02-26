import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../../constants';

const USER_STATE = {
  loading: false,
};

export default (state = USER_STATE, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, loading: true };
    case LOGOUT_SUCCESS:
      return { ...state, loading: false };
    case LOGOUT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
