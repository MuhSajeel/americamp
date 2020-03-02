import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from '../../constants';

export const forgotPassword = payload => {
  return { type: FORGOT_PASSWORD, payload };
};

export const forgotPasswordSuccess = () => {
  return { type: FORGOT_PASSWORD_SUCCESS };
};

export const forgotPasswordFailure = () => {
  return { type: FORGOT_PASSWORD_FAILURE };
};
