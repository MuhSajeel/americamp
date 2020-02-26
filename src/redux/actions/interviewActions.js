import {
  BOOK_INTERVIEW,
  BOOK_INTERVIEW_FAILURE,
  FETCH_INTERVIEW_STATUS,
  FETCH_INTERVIEW_STATUS_FAILURE,
} from '../../constants';

export const bookInterview = payload => {
  return { type: BOOK_INTERVIEW, payload };
};

export const bookInterviewFailure = () => {
  return { type: BOOK_INTERVIEW_FAILURE };
};

export const fetchInterviewStatus = () => {
  return { type: FETCH_INTERVIEW_STATUS };
};

export const fetchInterviewStatusFailuure = () => {
  return { type: FETCH_INTERVIEW_STATUS_FAILURE };
};
