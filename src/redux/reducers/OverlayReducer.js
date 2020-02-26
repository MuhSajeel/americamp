import {
  INFO_SUBMIT_SUCCESS,
  FETCH_USER_PROFILE_FAIL,
  FETCH_FORM_STATUS_SUCCESS,
  FETCH_FORM_STATUS_FAIL,
  FETCH_STAGES_PROGRESS_SUCCESS,
  FETCH_STAGES_PROGRESS_FAILURE,
  ON_DOCUMENT_UPLOAD,
  ON_DOCUMENT_UPLOAD_SUCCESS,
  ON_DOCUMENT_UPLOAD_FAILURE,
} from '../../constants';

const USER_EMAIL_STATE = {
  waitFor: 0,
};

export default (state = USER_EMAIL_STATE, action) => {
  switch (action.type) {
    case INFO_SUBMIT_SUCCESS:
      return { ...state, waitFor: action.payload.noOverlay ? 0 : 2 };
    case ON_DOCUMENT_UPLOAD:
      return { ...state, waitFor: 1 };
    case ON_DOCUMENT_UPLOAD_SUCCESS:
      return { ...state, waitFor: 0 };
    case ON_DOCUMENT_UPLOAD_FAILURE:
      return { ...state, waitFor: 0 };
    case FETCH_USER_PROFILE_FAIL:
      return { ...state, waitFor: 0 };
    case FETCH_FORM_STATUS_SUCCESS:
      return { ...state, waitFor: state.waitFor - 1 };
    case FETCH_FORM_STATUS_FAIL:
      return { ...state, waitFor: state.waitFor - 1 };
    case FETCH_STAGES_PROGRESS_SUCCESS:
      return { ...state, waitFor: state.waitFor - 1 };
    case FETCH_STAGES_PROGRESS_FAILURE:
      return { ...state, waitFor: state.waitFor - 1 };
    default:
      return state;
  }
};
