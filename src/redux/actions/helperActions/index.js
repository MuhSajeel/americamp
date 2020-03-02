import * as constants from '../../../constants';

export const isLoading = payload => {
  return {
    type: constants.SET_LOADING,
    payload,
  };
};

export const errorRequest = error => {
  return {
    type: constants.SET_ERROR,
    error,
  };
};
