import * as CONSTANTS from '../../constants';

export const resetPassword = payload => {
  return { type: CONSTANTS.SUBMIT_RESET_PASSWORD, payload };
};

export const resetPasswordSuccess = payload => {
  return { type: CONSTANTS.RESET_PASSWORD_SUCCESS, payload };
};

export const resetPasswordFailure = payload => {
  return { type: CONSTANTS.RESET_PASSWORD_FAILURE, payload };
};
