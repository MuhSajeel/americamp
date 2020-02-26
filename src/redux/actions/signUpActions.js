import * as CONSTANTS from '../../constants';

export const signUp = payload => ({ type: CONSTANTS.SIGNUP, payload });

export const signUpSuccess = payload => ({ type: CONSTANTS.SIGNUP_SUCCESS, payload });

export const signUpFailure = () => ({ type: CONSTANTS.SIGNUP_FAILURE });
