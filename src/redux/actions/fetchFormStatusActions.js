import * as CONSTANTS from '../../constants';

export const fetchFormStatusSuccess = payload => {
  return { type: CONSTANTS.FETCH_FORM_STATUS_SUCCESS, payload };
};

export const fetchFormStatusFailure = () => {
  return { type: CONSTANTS.FETCH_FORM_STATUS_FAIL };
};
