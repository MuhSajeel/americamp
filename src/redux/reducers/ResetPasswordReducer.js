import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SUBMIT_RESET_PASSWORD,
} from '../../constants';

const INITIAL_STATE = {
  success: false,
  message: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_RESET_PASSWORD:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload.data.success,
        message: action.payload.data.msg,
        loading: false,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        success: false,
        message: '',
        loading: false,
      };
    default:
      return state;
  }
};
