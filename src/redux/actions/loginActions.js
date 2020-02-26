import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../constants';

export const loginAction = payload => {
  return { type: LOGIN, payload };
};

export const loginActionSuccess = payload => {
  return { type: LOGIN_SUCCESS, payload };
};

export const loginActionFailure = () => {
  return { type: LOGIN_FAILURE };
};
