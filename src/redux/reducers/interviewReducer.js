/* eslint-disable camelcase */
import * as CONSTANTS from '../../constants';

import { Interview } from '../state/initial';

export default (state = Interview, action) => {
  switch (action.type) {
    case CONSTANTS.INTERVIEW_DATE_CHANGED:
      return { ...state, requested_on: action.payload };
    case CONSTANTS.INTERVIEW_STATUS_CHANGED:
      return { ...state, status: action.payload, loading: false };
    case CONSTANTS.INTERVIEW_TIME_CHANGED:
      return { ...state, starts_at: action.payload };
    case CONSTANTS.BOOK_INTERVIEW:
      return { ...state, loading: true };
    case CONSTANTS.BOOK_INTERVIEW_FAILURE:
      return { ...state, loading: false };
    case CONSTANTS.FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload.interview };
    case CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...action.payload.interview };
    default:
      return state;
  }
};
