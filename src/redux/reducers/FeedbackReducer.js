import {
  SUBMIT_FEEDBACK,
  FETCH_FEEDBACK_SUCCESS,
  INPUT_FEEDBACK,
  FETCH_FEEDBACK_FAILURE,
} from '../../constants';

const USER_RATING_STATE = {
  feedback: '',
  loading: false,
};

export default (state = USER_RATING_STATE, action) => {
  switch (action.type) {
    case INPUT_FEEDBACK:
      return { ...state, feedback: action.payload };
    case SUBMIT_FEEDBACK:
      return { ...state, loading: true };
    case FETCH_FEEDBACK_SUCCESS:
      return { ...state, feedback: action.payload.feedback, loading: false };
    case FETCH_FEEDBACK_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
