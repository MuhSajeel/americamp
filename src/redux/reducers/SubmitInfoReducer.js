import {
  INFO_SUBMITTED,
  INFO_SUBMIT_SUCCESS,
  INFO_SUBMIT_FAIL,
  DO_PAYMENT,
  DO_PAYMENT_SUCCESS,
  DO_PAYMENT_FAILURE,
} from '../../constants';

const INFO_SUBMIT_STATE = {
  loading: false,
  paying: null,
};

export default (state = INFO_SUBMIT_STATE, action) => {
  switch (action.type) {
    case INFO_SUBMITTED:
      return { ...state, loading: true };
    case DO_PAYMENT:
      return { ...state, paying: true };
    case DO_PAYMENT_SUCCESS:
      return { ...state, paying: false };
    case DO_PAYMENT_FAILURE:
      return { ...state, paying: null };
    case INFO_SUBMIT_SUCCESS:
      return { ...state, loading: false };
    case INFO_SUBMIT_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
