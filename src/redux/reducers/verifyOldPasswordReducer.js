import {
  VERIFY_OLD_PASSWORD,
  VERIFY_OLD_PASSWORD_SUCCESS,
  VERIFY_OLD_PASSWORD_FAILURE,
} from '../../constants';

const USER_STATE = {
  loading: false,
};

export default (state = USER_STATE, action) => {
  switch (action.type) {
    case VERIFY_OLD_PASSWORD:
      return { ...state, loading: true };
    case VERIFY_OLD_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case VERIFY_OLD_PASSWORD_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
