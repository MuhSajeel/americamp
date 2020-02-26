import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../../constants';

export const logoutAction = payload => ({ type: LOGOUT, payload });

export const logoutActionSuccess = () => {
  return { type: LOGOUT_SUCCESS };
};

export const logoutActionFailure = () => {
  return { type: LOGOUT_FAILURE };
};
